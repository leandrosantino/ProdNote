import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { jwtVerify } from './utils/jwtModule'

export function createContext({ req }: CreateFastifyContextOptions) {
  if (req.headers.authorization) {
    const user = jwtVerify(
      req.headers.authorization
    );
    return { user };
  }
  return { user: null };
}

export type Context = inferAsyncReturnType<typeof createContext>;
