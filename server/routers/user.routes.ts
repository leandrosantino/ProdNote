import { initTRPC } from "@trpc/server";
import { Context } from "../context";
import { isAuthenticate } from "../middlewares/authenticate";
import { z } from "zod";
import { createUserRequestDTOSchema, createUserResponseDTOschema } from '../useCases/CreateUser/CreateUserDTO'
import { createUser } from '../useCases/CreateUser'
import { getUserInfoResponseDTOschema } from '../useCases/GetUserInfo/GetUserInfoDTO'
import { getUserInfo } from '../useCases/GetUserInfo'
import { HttpError } from "../utils/HttpError";


const t = initTRPC.context<Context>().create()

const protect = t.procedure.use(isAuthenticate)

export const userRoutes = t.router({
  authTeste: protect
    .output(z.string())
    .query(async () => {
      return 'Authenticate!'
    })
  ,

  create: t.procedure
    .input(createUserRequestDTOSchema)
    .output(createUserResponseDTOschema)
    .mutation(async ({ input }) => {
      return createUser.execute(input)
    })
  ,

  getInfo: protect
    .output(getUserInfoResponseDTOschema)
    .query(async ({ ctx }) => {
      const { user } = ctx
      try {
        return await getUserInfo.execute(user.name)
      } catch (err) {
        throw new HttpError({ code: 'BAD_REQUEST', message: (err as Error).message })
      }
    })


})
