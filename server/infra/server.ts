import fastify, { type FastifyInstance } from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { type FastifyTRPCPluginOptions, fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { getFastifyPlugin } from 'trpc-playground/handlers/fastify'
import { appRouter, type AppRouter } from './routers'
import fastifyCors from '@fastify/cors'
import { createContext } from './context'
import { logger } from '../utils/logger'

export class HttpServer {
  private readonly port: number
  private readonly apiEndpoint: string
  private readonly playgroundEndpoint: string
  private readonly staticsDirectory: string
  private readonly server: FastifyInstance

  constructor (props: {
    port: number
    apiEndpoint: string
    playgroundEndpoint: string
    staticsDirectory: string
  }) {
    this.port = props.port
    this.apiEndpoint = props.apiEndpoint
    this.playgroundEndpoint = props.playgroundEndpoint
    this.staticsDirectory = props.staticsDirectory
    this.server = fastify()
  }

  startRoutes () {
    try {
      this.server.get('/', async (request, reply) => {
        await reply.sendFile('index.html')
      })

      logger.info('start routes successfully')
    } catch (err) {
      logger.error(err)
      throw new Error('failed to start routes')
    }
  }

  async startApi () {
    try {
      const trpcPlaygroundPlugin = await getFastifyPlugin({
        router: appRouter,
        trpcApiEndpoint: this.apiEndpoint,
        playgroundEndpoint: this.playgroundEndpoint
      })

      await this.server.register(fastifyTRPCPlugin, {
        prefix: this.apiEndpoint,
        trpcOptions: {
          router: appRouter,
          createContext
        }
      } as FastifyTRPCPluginOptions<AppRouter>)

      await this.server.register(trpcPlaygroundPlugin, { prefix: this.playgroundEndpoint })
      logger.info('start api successfully')
    } catch (err) {
      logger.error(err)
      throw new Error('failed to start api')
    }
  }

  async configurePluguns () {
    try {
      await this.server.register(fastifyStatic, {
        root: path.join(__dirname, './static')
      })

      await this.server.register(fastifyCors, {
        origin: '*'
      })

      logger.info('configure pluguns successfully')
    } catch (err) {
      logger.error(err)
      throw new Error('failed to configure pluguns')
    }
  }

  async listen () {
    try {
      this.startRoutes()
      await this.startApi()
      await this.configurePluguns()

      this.server.listen({ port: 3336, host: '0.0.0.0' }, (err) => {
        if (err != null) {
          logger.error(String(err))
          return
        }
        logger.success('Server online!')
      })
    } catch (err) {
      logger.error((err as Error).message)
    }
  }
}
