import fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { type FastifyTRPCPluginOptions, fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { getFastifyPlugin } from 'trpc-playground/handlers/fastify'
import { appRouter, type AppRouter } from './routers'
import fastifyCors from '@fastify/cors'
import { createContext } from './context'
import { logger } from './utils/logger';

(async () => {
  const server = fastify()

  const trpcApiEndpoint = '/api'
  const playgroundEndpoint = '/playground'

  const trpcPlaygroundPlugin = await getFastifyPlugin({
    router: appRouter,
    trpcApiEndpoint,
    playgroundEndpoint
  })

  server.register(fastifyTRPCPlugin, {
    prefix: trpcApiEndpoint,
    trpcOptions: {
      router: appRouter,
      createContext
    }
  } as FastifyTRPCPluginOptions<AppRouter>)

  server.register(trpcPlaygroundPlugin, { prefix: '/playground' })

  server.register(fastifyStatic, {
    root: path.join(__dirname, './static')
  })

  server.register(fastifyCors, {
    origin: '*'
  })

  server.get('/', (request, reply) => {
    reply.sendFile('index.html')
  })

  server.listen({ port: 3336 }, (err) => {
    if (err != null) {
      logger.error(String(err))
      return
    }

    logger.info('Server online!')
  })
})()
