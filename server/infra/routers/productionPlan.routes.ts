import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { productionPlan } from '../../useCases/ProductionPlan/index'
import { HttpError } from '../../utils/HttpError'
import { z } from 'zod'

const t = initTRPC.context<Context>().create()

const procedure = t.procedure.use(authenticattionMiddleware('PLANNING'))

export const ProductionPlanRoutes = t.router({
  execute: procedure
    .input(z.object({
      productiveDays: z.number(),
      lowRunner: z.number(),
      highRunner: z.number(),
      machinesId: z.array(z.string()),
      products: z.array(
        z.object({
          partNumber: z.string(),
          stock: z.number(),
          demand: z.number()
        })
      )
    }))
    .mutation(async ({ input }) => {
      try {
        return await productionPlan.execute(input)
      } catch (err) {
        throw new HttpError({ code: 'INTERNAL_SERVER_ERROR', message: 'Fail in server!' })
      }
    })
})
