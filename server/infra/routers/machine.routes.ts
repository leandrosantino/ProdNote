import { initTRPC } from '@trpc/server'
import { type Context } from '../../infra/context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { Machine } from '../../entities/Machine'
import { z } from 'zod'
import { MachineRepository } from '../repositories/prisma/MachineRepository'

const t = initTRPC.context<Context>().create()

const procedure = t.procedure.use(authenticattionMiddleware())

const machineRepository = new MachineRepository()

export const MachineRoutes = t.router({
  getAll: procedure
    .output(z.array(z.instanceof(Machine)))
    .query(async () => {
      return await machineRepository.findMany()
    })
})
