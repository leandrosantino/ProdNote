import fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { type FastifyTRPCPluginOptions, fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { getFastifyPlugin } from 'trpc-playground/handlers/fastify'
import { appRouter, type AppRouter } from './routers'
import fastifyCors from '@fastify/cors'
import { createContext } from './context'
import { logger } from './utils/logger'

import './utils/reactTest'

(async () => {
  const server = fastify()

  const trpcApiEndpoint = '/api'
  const playgroundEndpoint = '/playground'

  const trpcPlaygroundPlugin = await getFastifyPlugin({
    router: appRouter,
    trpcApiEndpoint,
    playgroundEndpoint
  })

  await server.register(fastifyTRPCPlugin, {
    prefix: trpcApiEndpoint,
    trpcOptions: {
      router: appRouter,
      createContext
    }
  } as FastifyTRPCPluginOptions<AppRouter>)

  await server.register(trpcPlaygroundPlugin, { prefix: '/playground' })

  await server.register(fastifyStatic, {
    root: path.join(__dirname, './static')
  })

  await server.register(fastifyCors, {
    origin: '*'
  })

  server.get('/', async (request, reply) => {
    await reply.sendFile('index.html')
  })

  server.listen({ port: 3336, host: '0.0.0.0' }, (err) => {
    if (err != null) {
      logger.error(String(err))
      return
    }

    logger.info('Server online!')
  })
})()
  .then(() => {})
  .catch(() => {})
