import { initTRPC } from '@trpc/server'
import { Context } from '../context';
import { JwtProvider } from '../providers/implementations/JwtProvider'
import { HttpError } from '../utils/HttpError';
import { IJwtUserData } from '../providers/IJwtProvider';
const t = initTRPC.context<Context>().create()

const jwt = new JwtProvider()

export const isAuthenticate = t.middleware(({ ctx, next, }) => {
  const { headers } = ctx;

  if (headers.authorization) {
    let user: IJwtUserData
    try {
      user = jwt.verify(headers.authorization)
    } catch (err) {
      throw new HttpError({ code: 'UNAUTHORIZED', message: (err as Error).message });
    }

    return next({
      ctx: {
        user: user,
      },
    })
  }
  throw new HttpError({ code: 'UNAUTHORIZED', message: 'Authorization header not_found' });


})
