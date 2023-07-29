import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { createTags } from '../../useCases/CreateTags'
import { CreateTagsRequestDTO } from '../../useCases/CreateTags/CreateTagsDTO'
import { z } from 'zod'

const t = initTRPC.context<Context>().create()

const procedure = t.procedure.use(authenticattionMiddleware('GENERATE_TAGS'))

export const tagRoutes = t.router({
  create: procedure
    .input(z.array(z.instanceof(CreateTagsRequestDTO)))
    .mutation(async ({ input }) => {
      return await createTags.execute(input)
    })
})
