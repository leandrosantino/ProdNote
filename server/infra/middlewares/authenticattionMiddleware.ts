import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { HttpError } from '../../utils/HttpError'
import { type SystemPermissionKeys } from '../../entities/SystemPermission'
import { tokenManagement } from '../../services/TokenManagement'

const t = initTRPC.context<Context>().create()

export function authenticattionMiddleware (requiredPermission?: SystemPermissionKeys) {
  return t.middleware(async ({ ctx: { headers }, next }) => {
    try {
      const user = await tokenManagement.verify(headers.authorization, requiredPermission)
      return await next({
        ctx: {
          user
        }
      })
    } catch (err) {
      throw new HttpError({ code: 'UNAUTHORIZED', message: (err as Error).message })
    }
  })
}
