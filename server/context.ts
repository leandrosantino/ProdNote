import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { IJwtUserData } from './providers/IJwtProvider';

export function createContext({ req }: CreateFastifyContextOptions) {
  const user = {} as IJwtUserData
  return { headers: req.headers, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
