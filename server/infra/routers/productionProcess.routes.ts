import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { Repositories } from '../repositories'
import { z } from 'zod'
import { technologyTypesList } from '../../entities/ProductionProcess'
import { uteKeysList } from '../../entities/ProductionEfficiencyRecord'
import { deleteProductionProcess } from '../../useCases/DeleteProductionProcess'

const t = initTRPC.context<Context>().create()
const procedure = t.procedure.use(authenticattionMiddleware('OEE_ADMIN'))
const productionProcessRepository = new Repositories.ProductionProcess()

const productionProcessInputSchema = z.object({
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
})

export const ProductionProcessRoutes = t.router({
  create: procedure
    .input(productionProcessInputSchema)
    .mutation(async ({ input }) => {
      return await productionProcessRepository.create(input)
    }),
  update: procedure
    .input(z.object({
      process: productionProcessInputSchema,
      id: z.string()
    }))
    .mutation(async ({ input }) => {
      return await productionProcessRepository.update(input.id, input.process)
    }),
  delete: procedure
    .input(z.object({
      productionProcessId: z.string(),
      userId: z.string(),
      password: z.string()
    }))
    .mutation(async ({ input }) => {
      await deleteProductionProcess.execute(input)
    })
})
