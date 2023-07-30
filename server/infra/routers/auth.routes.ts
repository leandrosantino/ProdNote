import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authentication } from '../../useCases/Authentication'
import { HttpError } from '../../utils/HttpError'
import { z } from 'zod'

const t = initTRPC.context<Context>().create()

export const authRoutes = t.router({
  login: t.procedure
    .input(z.object({
      userName: z.string(),
      password: z.string()
    }))
    .mutation(async ({ input }) => {
      try {
        return await authentication.execute(input)
      } catch (err) {
        throw new HttpError({ code: 'UNAUTHORIZED', message: (err as Error).message })
      }
    })
})
