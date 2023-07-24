import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { machineSchema } from '../entities/Machine'
import { z } from 'zod'
import { MachineRepository } from '../repositories/implementations/prisma/MachineRepository'

const t = initTRPC.context<Context>().create()

const protect = t.procedure.use(authenticattionMiddleware)

const machineRepository = new MachineRepository()

export const MachineRoutes = t.router({
  getAll: protect
    .output(z.array(machineSchema))
    .query(async () => {
      return await machineRepository.findMany()
    })
})
