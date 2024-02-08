import path from 'path'
import { HttpServer } from './infra/server'
import dotenv from 'dotenv'
import { backupService } from './services/BackupService'
dotenv.config()

const port = process.env.PORT as string

if (!port) {
  throw Error('port is note defined')
}

const server = new HttpServer(
  backupService,
  {
    apiEndpoint: '/api',
    playgroundEndpoint: '/playground',
    port: Number(port),
    staticsDirectory: path.join(__dirname, './static')
  }
)

server.listen()
  .catch(console.log)
