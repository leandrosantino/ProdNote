import { type inferAsyncReturnType } from '@trpc/server'
import { type CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import { type IJwtUserData } from './providers/interfaces/IJwtProvider'

export function createContext ({ req }: CreateFastifyContextOptions) {
  const user = {} as IJwtUserData
  return { headers: req.headers, user }
}

export type Context = inferAsyncReturnType<typeof createContext>
