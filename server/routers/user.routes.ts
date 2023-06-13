import { initTRPC } from "@trpc/server";
import { Context } from "../context";
import { isAuthenticate } from "../middlewares/authenticate";
import { z } from "zod";
import { createUserRequestDTOSchema } from '../useCases/CreateUser/CreateUserDTO'
import { userSchema } from '../entities/User'
import { createUser } from '../useCases/CreateUser'

const t = initTRPC.context<Context>().create()

const protect = t.procedure.use(isAuthenticate)

export const userRoutes = t.router({
  authTeste: protect
    .output(z.string())
    .query(async () => {
      return 'Authenticate!'
    })
  ,

  createUser: t.procedure
    .input(createUserRequestDTOSchema)
    .output(userSchema)
    .mutation(async ({ input }) => {
      return createUser.execute(input)
    })
})
