import { initTRPC } from '@trpc/server'
import { type Context } from '../../infra/context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { Repositories } from '../repositories'
import { z } from 'zod'
import { technologyTypesList } from '../../entities/ProductionProcess'
import { uteKeysList } from '../../entities/ProductionEfficiencyRecord'
const t = initTRPC.context<Context>().create()

const procedure = t.procedure.use(authenticattionMiddleware('ROOT'))
const productionProcessRepository = new Repositories.ProductionProcess()
export const RootRoutes = t.router({
  createProductionProcess: procedure
    .input(z.object({
      data: z.object({
        description: z.string(),
        cycleTimeInSeconds: z.number(),
        projectNumber: z.string(),
        productId: z.string(),
        cavitiesNumber: z.number(),
        technology: z.enum(technologyTypesList),
        ute: z.enum(uteKeysList)
      }),
      machines: z.string().array()
    }))
    .mutation(async ({ input }) => {
      return await productionProcessRepository.create(input)
    })
})
