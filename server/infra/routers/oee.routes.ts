import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { z } from 'zod'
import { registerProductionEfficiency } from '../../useCases/RegisterProductionEfficiency'
import { uteKeysList } from '../../entities/ProductionEfficiencyRecord'
import { Repositories } from '../repositories'
import { lossTypesList } from '../../entities/ReasonsLossEfficiency'

const t = initTRPC.context<Context>().create()

const procedure = t.procedure.use(authenticattionMiddleware('OEE_NOTE'))
const productionProcessRepository = new Repositories.ProductionProcess()
const reasonsLossEfficiencyRepository = new Repositories.ReasonsLossEfficiency()

export const oeeRoutes = t.router({
  registerProductionEfficiency: procedure
    .input(z.object({
      data: z.object({
        date: z.date(),
        turn: z.string(),
        ute: z.enum(uteKeysList),
        productionTimeInMinutes: z.number(),
        piecesQuantity: z.number(),
        productionProcessId: z.string()
      }),
      productionEfficiencyLosses: z.array(z.object({
        lostTimeInMinutes: z.number(),
        reasonsLossEfficiencyId: z.string(),
        machineId: z.string()
      }))
    }))
    .mutation(async ({ input }) => {
      return await registerProductionEfficiency.execute(input)
    }),

  claculate: procedure
    .input(z.object({
      piecesQuantity: z.number(),
      cycleTimeInSeconds: z.number(),
      productionTimeInMinutes: z.number()
    }))
    .query(({ input }) => {
      return registerProductionEfficiency.calculateOEE(input)
    }),

  getProcessesList: procedure
    .query(async () => {
      return await productionProcessRepository.findMany()
    }),

  getReasonsLossList: procedure
    .input(z.object({ type: z.enum(lossTypesList) }).optional())
    .query(async ({ input }) => {
      return await reasonsLossEfficiencyRepository.findMany(input)
    }),

  getProductionProcessMachines: procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await productionProcessRepository.getProductionProcessMachines(input.id)
    })
})
