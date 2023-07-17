import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { requiredPermissionMiddleware } from '../middlewares/requiredPermissionMiddleware'
import { productionPlanRequestsDTOSchema, productionPlanResponseDTOSchema } from '../useCases/ProductionPlan/ProductionPlanDTO'
import { productionPlan } from '../useCases/ProductionPlan/index'
import { HttpError } from '../utils/HttpError'

const t = initTRPC.context<Context>().create()

const protect = t.procedure.use(authenticattionMiddleware)

export const ProductionPlanRoutes = t.router({
  execute: protect.use(requiredPermissionMiddleware('PLANNING'))
    .input(productionPlanRequestsDTOSchema)
    .output(productionPlanResponseDTOSchema)
    .mutation(async ({ input }) => {
      try {
        return await productionPlan.execute(input)
      } catch (err) {
        throw new HttpError({ code: 'INTERNAL_SERVER_ERROR', message: 'Fail in server!' })
      }
    })
})
