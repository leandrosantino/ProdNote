import { initTRPC } from '@trpc/server'
import { type Context } from '../context'

import { authRoutes } from './auth.routes'
import { userRoutes } from './user.routes'
import { ProductionPlanRoutes } from './productionPlan.routes'
import { MachineRoutes } from './machine.routes'
import { tagRoutes } from './tag.routes'
import { productRoutes } from './product.routes'

const trpc = initTRPC.context<Context>().create()

export const appRouter = trpc.router({
  auth: authRoutes,
  user: userRoutes,
  productionPlan: ProductionPlanRoutes,
  machine: MachineRoutes,
  tag: tagRoutes,
  product: productRoutes
})

export type AppRouter = typeof appRouter
