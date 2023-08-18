import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { createTags } from '../../useCases/CreateTags'
import { z } from 'zod'
import { registerTags } from '../../useCases/RegisterTags'

const t = initTRPC.context<Context>().create()
const generateTagsProcedure = t.procedure.use(authenticattionMiddleware('GENERATE_TAGS'))
const readTagsProcedure = t.procedure.use(authenticattionMiddleware('READ_TAGS'))

export const tagRoutes = t.router({
  create: generateTagsProcedure
    .input(z.array(z.object({
      id: z.string(),
      isFractional: z.boolean(),
      amount: z.number()
    })
    ))
    .mutation(async ({ input }) => {
      return await createTags.execute(input)
    }),
  verifyTagId: readTagsProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await registerTags.verifyTagId(input)
    }),
  registerTag: readTagsProcedure
    .input(z.object({
      id: z.string(),
      productId: z.string(),
      userId: z.string(),
      amount: z.number()
    }))
    .mutation(async ({ input }) => {
      return await registerTags.execute(input)
    })
})
