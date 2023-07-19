import { initTRPC } from '@trpc/server'
import { type Context } from '../context'

import { authRoutes } from './auth.routes'
import { userRoutes } from './user.routes'
import { ProductionPlanRoutes } from '../routers/productionPlan.routes'
import { MachineRoutes } from '../routers/machine.routes'
import { tagRoutes } from '../routers/tag.routes'

const trpc = initTRPC.context<Context>().create()

export const appRouter = trpc.router({
  auth: authRoutes,
  user: userRoutes,
  productionPlan: ProductionPlanRoutes,
  machine: MachineRoutes,
  tag: tagRoutes
})

export type AppRouter = typeof appRouter
