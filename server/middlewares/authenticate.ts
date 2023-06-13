import { TRPCError, initTRPC } from '@trpc/server'
import { Context } from '../context';
import { jwtVerify } from '../utils/jwtModule'

const t = initTRPC.context<Context>().create()

interface TokenUserData {
  name: string
  id: string
}

export const isAuthenticate = t.middleware(({ ctx, next }) => {
  const { headers } = ctx;

  if (headers.authorization) {
    const user = jwtVerify<TokenUserData>(headers.authorization)
    if (!user.id) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid access_token!' });
    }
    return next({
      ctx: {
        user: user,
      },
    })
  }
  throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Authorization header not_found' });


})
