import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { machineSchema } from '../entities/Machine'
import { z } from 'zod'
import { getMachines } from '../services/getMachines'

const t = initTRPC.context<Context>().create()

const protect = t.procedure.use(authenticattionMiddleware)

export const MachineRoutes = t.router({
  get: protect
    .output(z.array(machineSchema))
    .query(async () => {
      return await getMachines.execute()
    })
})
