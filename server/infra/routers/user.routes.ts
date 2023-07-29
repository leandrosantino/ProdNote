import { initTRPC } from '@trpc/server'
import { type Context } from '../context'
import { authenticattionMiddleware } from '../middlewares/authenticattionMiddleware'
import { CreateUserRequestDTO, CreateUserResponseDTO } from '../../useCases/CreateUser/CreateUserDTO'
import { createUser } from '../../useCases/CreateUser'
import { GetUserInfoResponseDTO } from '../../useCases/GetUserInfo/GetUserInfoDTO'
import { getUserInfo } from '../../useCases/GetUserInfo'
import { HttpError } from '../../utils/HttpError'
import { z } from 'zod'

const t = initTRPC.context<Context>().create()

export const userRoutes = t.router({
  create: t.procedure.use(authenticattionMiddleware('CREATE_USERS'))
    .input(z.instanceof(CreateUserRequestDTO))
    .output(z.instanceof(CreateUserResponseDTO))
    .mutation(async ({ input }) => {
      return await createUser.execute(input)
    }),

  getInfo: t.procedure.use(authenticattionMiddleware())
    .output(z.instanceof(GetUserInfoResponseDTO))
    .query(async ({ ctx }) => {
      const { user } = ctx
      try {
        return await getUserInfo.execute(user.id)
      } catch (err) {
        throw new HttpError({ code: 'BAD_REQUEST', message: (err as Error).message })
      }
    })

})
