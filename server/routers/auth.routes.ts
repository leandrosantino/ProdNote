import { initTRPC } from "@trpc/server";
import { Context } from "../context";
import { z } from "zod";
import { userAuth } from '../useCases/UserAuth'
import { userAuthRequestDTOSchema } from "../useCases/UserAuth/UserAuthDTO";

const t = initTRPC.context<Context>().create()

export const authRoutes = t.router({
  login: t.procedure
    .input(userAuthRequestDTOSchema)
    .output(z.string().optional())
    .mutation(async ({ input }) => {
      return userAuth.execute(input)
    })
})
