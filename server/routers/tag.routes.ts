import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { requiredPermissionMiddleware } from '../middlewares/requiredPermissionMiddleware'
import { createTags } from '../useCases/CreateTags'
import { createTagsRequestDTOSchema } from '../useCases/CreateTags/CreateTagsDTO'

const t = initTRPC.context<Context>().create()

const protect = t.procedure.use(authenticattionMiddleware)

export const tagRoutes = t.router({
  create: protect.use(requiredPermissionMiddleware('GENERATE_TAGS'))
    .input(createTagsRequestDTOSchema)
    .mutation(async ({ input }) => {
      return await createTags.execute(input)
    })
})
