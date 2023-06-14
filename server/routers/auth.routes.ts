import { initTRPC } from "@trpc/server";
import { Context } from "../context";
import { z } from "zod";
import { userAuth } from '../useCases/UserAuth'
import { userAuthRequestDTOSchema } from "../useCases/UserAuth/UserAuthDTO";
import { HttpError } from "../utils/HttpError";

const t = initTRPC.context<Context>().create()

export const authRoutes = t.router({
  login: t.procedure
    .input(userAuthRequestDTOSchema)
    .output(z.string().optional())
    .mutation(async ({ input }) => {
      try {
        return await userAuth.execute(input)
      } catch (err) {
        throw new HttpError({ code: 'UNAUTHORIZED', message: (err as Error).message })
      }
    })
})
