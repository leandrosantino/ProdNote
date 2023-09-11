import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { z } from 'zod'
import { registerProductionEfficiency } from '../../useCases/RegisterProductionEfficiency'
import { uteKeysList } from '../../entities/ProductionEfficiencyRecord'
import { Repositories } from '../repositories'
import { classificationTypesList, lossTypesList } from '../../entities/ReasonsLossEfficiency'
import { technologyTypesList } from '../../entities/ProductionProcess'
import { getOeeDashboardData } from '../../useCases/GetOeeDashboardData'

const t = initTRPC.context<Context>().create()

const procedure = t.procedure.use(authenticattionMiddleware('OEE_NOTE'))
const productionProcessRepository = new Repositories.ProductionProcess()
const reasonsLossEfficiencyRepository = new Repositories.ReasonsLossEfficiency()

const filtersSchema = z.object({
  technology: z.enum(technologyTypesList).optional(),
  classification: z.enum(classificationTypesList).optional(),
  turn: z.string().optional(),
  date: z.object({
    day: z.number().optional(),
    mouth: z.number(),
    year: z.number()
  })
})

export const oeeRoutes = t.router({
  registerProductionEfficiency: procedure
    .input(z.object({
      data: z.object({
        date: z.coerce.date(),
        turn: z.string(),
        ute: z.enum(uteKeysList),
        productionTimeInMinutes: z.number(),
        piecesQuantity: z.number(),
        productionProcessId: z.string(),
        userId: z.string()
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
      productionTimeInMinutes: z.number(),
      cavitiesNumber: z.number()
    }))
    .query(({ input }) => {
      return registerProductionEfficiency.calculateOEE(input)
    }),

  verifyCoerency: procedure
    .input(z.object({
      piecesQuantity: z.number(),
      cycleTimeInSeconds: z.number(),
      productionTimeInMinutes: z.number(),
      lostTimeInMinutes: z.number(),
      cavitiesNumber: z.number()
    }))
    .query(({ input }) => {
      return registerProductionEfficiency.verifyCoerency(input)
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
    }),

  getTurnChartDate: procedure
    .input(filtersSchema)
    .query(async ({ input }) => {
      return await getOeeDashboardData.getTurnChartDate(input)
    }),

  getClassChartData: procedure
    .input(filtersSchema)
    .query(async ({ input }) => {
      return await getOeeDashboardData.getClassChartData(input)
    }),

  getDailyChartData: procedure
    .input(filtersSchema)
    .query(async ({ input }) => {
      return await getOeeDashboardData.getDailyChartData(input)
    }),

  getGeneralOeeValue: procedure
    .input(filtersSchema)
    .query(async ({ input }) => {
      return await getOeeDashboardData.getGeneralOeeValue(input)
    })

})
