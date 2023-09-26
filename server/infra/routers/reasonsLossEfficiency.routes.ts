import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { Repositories } from '../repositories'
import { z } from 'zod'
import { lossTypesList, classificationTypesList } from '../../entities/ReasonsLossEfficiency'

const reasonsLossEfficiencRepository = new Repositories.ReasonsLossEfficiency()

const t = initTRPC.context<Context>().create()
const procedure = t.procedure.use(authenticattionMiddleware('OEE_ADMIN'))

export const ReasonsLossEfficiencyRoutes = t.router({
  create: procedure
    .input(z.object({
      type: z.enum(lossTypesList),
      description: z.string(),
      classification: z.enum(classificationTypesList)
    }))
    .mutation(async ({ input }) => {
      return await reasonsLossEfficiencRepository.create(input)
    }),
  update: procedure
    .input(z.object({
      id: z.string(),
      data: z.object({
        type: z.enum(lossTypesList),
        description: z.string(),
        classification: z.enum(classificationTypesList)
      })
    }))
    .mutation(async ({ input: { data, id } }) => {
      return await reasonsLossEfficiencRepository.update(data, id)
    }),
  delete: procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      await reasonsLossEfficiencRepository.delete(id)
    }),

  findMany: procedure
    .input(z.object({
      type: z.enum(lossTypesList).optional(),
      description: z.string().optional()
    }))
    .query(async ({ input }) => {
      return await reasonsLossEfficiencRepository.findMany(input)
    })
})
