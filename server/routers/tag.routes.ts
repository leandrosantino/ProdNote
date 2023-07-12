import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { z } from 'zod'
import { requiredPermissionMiddleware } from '../middlewares/requiredPermissionMiddleware'

const t = initTRPC.context<Context>().create()

const protect = t.procedure.use(authenticattionMiddleware)

export const tagRoutes = t.router({
  create: protect.use(requiredPermissionMiddleware('GENERATE_TAGS'))
    .output(z.string())
    .query(async () => {
      return 'Authenticate!'
    })
})
