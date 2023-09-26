import { initTRPC } from '@trpc/server'
import { type Context } from '../context'

import { authRoutes } from './auth.routes'
import { userRoutes } from './user.routes'
import { ProductionPlanRoutes } from './productionPlan.routes'
import { MachineRoutes } from './machine.routes'
import { tagRoutes } from './tag.routes'
import { productRoutes } from './product.routes'
import { oeeRoutes } from './oee.routes'
import { ProductionProcessRoutes } from './productionProcess.routes'
import { ReasonsLossEfficiencyRoutes } from './reasonsLossEfficiency.routes'

const trpc = initTRPC.context<Context>().create()

export const appRouter = trpc.router({
  auth: authRoutes,
  user: userRoutes,
  productionPlan: ProductionPlanRoutes,
  machine: MachineRoutes,
  tag: tagRoutes,
  product: productRoutes,
  oee: oeeRoutes,
  productionProcess: ProductionProcessRoutes,
  reasonsLossEfficiency: ReasonsLossEfficiencyRoutes
})

export type AppRouter = typeof appRouter
