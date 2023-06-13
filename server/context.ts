import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export function createContext({ req }: CreateFastifyContextOptions) {
  return { headers: req.headers };
}

export type Context = inferAsyncReturnType<typeof createContext>;
