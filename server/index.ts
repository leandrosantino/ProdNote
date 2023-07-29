import path from 'path'
import { HttpServer } from './infra/server'

const server = new HttpServer({
  apiEndpoint: '/api',
  playgroundEndpoint: '/playground',
  port: 3336,
  staticsDirectory: path.join(__dirname, './static')
})

server.listen()
  .catch(console.log)
