import { initTRPC } from "@trpc/server";
import { Context } from "../context";
import { isAuthenticate } from "../middlewares/authenticate";
import { z } from "zod";

const t = initTRPC.context<Context>().create()

const protect = t.procedure.use(isAuthenticate)


export const userRoutes = t.router({
  authTeste: protect
    .output(z.string())
    .query(async ({ }) => {
      return 'Authenticate!'
    })
  ,
})
