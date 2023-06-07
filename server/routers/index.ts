import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const trpc = initTRPC.create()

export const appRouter = trpc.router({
  test: trpc.procedure
    .output(z.string())
    .query(async () => {
      return 'test'
    })
})
