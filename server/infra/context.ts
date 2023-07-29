import { type inferAsyncReturnType } from '@trpc/server'
import { type CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import { type TokenData } from '../interfaces/ITokenManagement'

export function createContext ({ req }: CreateFastifyContextOptions) {
  const user = {} as TokenData
  return { headers: req.headers, user }
}

export type Context = inferAsyncReturnType<typeof createContext>
