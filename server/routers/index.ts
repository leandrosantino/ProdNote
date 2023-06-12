import { initTRPC } from '@trpc/server'
import { Context } from '../context'

import { authRoutes } from './auth.routes'
import { userRoutes } from './user.routes'

const trpc = initTRPC.context<Context>().create()


export const appRouter = trpc.router({
  auth: authRoutes,
  user: userRoutes
})

export type AppRouter = typeof appRouter
