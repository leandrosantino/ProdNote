import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
dotenv.config()

const databaseUrl = process.env.DATABASE_URL_PRODUCTION
const isDev = process.env.IS_DEV as string

if (isDev === 'false' && !databaseUrl) {
  throw new Error('the database url is not defined')
}

export const prisma = new PrismaClient({
  ...isDev === 'false'
    ? { datasourceUrl: 'file:' + (databaseUrl as string) }
    : {}
})
