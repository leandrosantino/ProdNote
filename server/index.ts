import fastify from "fastify";
import fastifyStatic from '@fastify/static'
import path from 'path'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { getFastifyPlugin } from 'trpc-playground/handlers/fastify'
import { appRouter } from "./routers";
import fastifyCors from "@fastify/cors";

(async () => {

  const server = fastify();

  const trpcApiEndpoint = '/api'
  const playgroundEndpoint = '/playground'

  const trpcPlaygroundPlugin = await getFastifyPlugin({
    router: appRouter,
    trpcApiEndpoint,
    playgroundEndpoint,
  })

  server.register(fastifyStatic, {
    root: path.join(__dirname, './static')
  });

  server.register(fastifyCors, {
    origin: '*'
  })

  server.register(fastifyTRPCPlugin, {
    prefix: trpcApiEndpoint,
    trpcOptions: {
      router: appRouter
    }
  })

  server.register(trpcPlaygroundPlugin, { prefix: '/playground' })


  server.get('/', (request, reply) => {
    reply.sendFile('index.html')
  });

  server.listen({ port: 3336 }, (err) => {

    if (err) {
      console.log(err)
      return
    }

    console.log('Server online!')
  })

})()
