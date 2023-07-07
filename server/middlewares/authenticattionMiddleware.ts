import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { JwtProvider } from '../providers/implementations/JwtProvider'
import { HttpError } from '../utils/HttpError'
import { type IJwtUserData } from '../providers/interfaces/IJwtProvider'
const t = initTRPC.context<Context>().create()

const jwt = new JwtProvider()

export const authenticattionMiddleware = t.middleware(async ({ ctx, next }) => {
  const { headers } = ctx

  if (headers.authorization !== undefined) {
    let user: IJwtUserData
    try {
      user = jwt.verify(headers.authorization)
    } catch (err) {
      throw new HttpError({ code: 'UNAUTHORIZED', message: (err as Error).message })
    }

    return await next({
      ctx: {
        user
      }
    })
  }
  throw new HttpError({ code: 'UNAUTHORIZED', message: 'Authorization header not_found' })
})
