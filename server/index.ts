import path from 'path'
import { HttpServer } from './infra/server'
import dotenv from 'dotenv'
import { backupService } from './services/BackupService'
dotenv.config()

const server = new HttpServer(
  backupService,
  {
    apiEndpoint: '/api',
    playgroundEndpoint: '/playground',
    port: 3336,
    staticsDirectory: path.join(__dirname, './static')
  }
)

server.listen()
  .catch(console.log)
