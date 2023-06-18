import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { z } from 'zod'
import { createUserRequestDTOSchema, createUserResponseDTOschema } from '../useCases/CreateUser/CreateUserDTO'
import { createUser } from '../useCases/CreateUser'
import { getUserInfoResponseDTOschema } from '../useCases/GetUserInfo/GetUserInfoDTO'
import { getUserInfo } from '../useCases/GetUserInfo'
import { HttpError } from '../utils/HttpError'
import { requiredPermissionMiddleware } from '../middlewares/requiredPermissionMiddleware'

const t = initTRPC.context<Context>().create()

const protect = t.procedure.use(authenticattionMiddleware)

export const userRoutes = t.router({
  authTeste: protect.use(requiredPermissionMiddleware('GENERATE_TAGS'))
    .output(z.string())
    .query(async () => {
      return 'Authenticate!'
    }),

  create: t.procedure
    .input(createUserRequestDTOSchema)
    .output(createUserResponseDTOschema)
    .mutation(async ({ input }) => {
      return await createUser.execute(input)
    }),

  getInfo: protect
    .output(getUserInfoResponseDTOschema)
    .query(async ({ ctx }) => {
      const { user } = ctx
      try {
        return await getUserInfo.execute(user.id)
      } catch (err) {
        throw new HttpError({ code: 'BAD_REQUEST', message: (err as Error).message })
      }
    })

})
