import { initTRPC } from '@trpc/server'
import { Context } from '../context';
import { JwtProvider } from '../providers/implementations/JwtProvider'
import { HttpError } from '../utils/HttpError';
const t = initTRPC.context<Context>().create()

const jwt = new JwtProvider()

export const isAuthenticate = t.middleware(({ ctx, next }) => {
  const { headers } = ctx;

  if (headers.authorization) {
    const user = jwt.verify(headers.authorization)
    if (!user.id) {
      throw new HttpError({ code: 'UNAUTHORIZED', message: 'Invalid access_token!' });
    }
    return next({
      ctx: {
        user: user,
      },
    })
  }
  throw new HttpError({ code: 'UNAUTHORIZED', message: 'Authorization header not_found' });


})
