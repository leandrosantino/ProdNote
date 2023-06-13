import { initTRPC } from "@trpc/server";
import { Context } from "../context";
import { jwtSigin } from "../utils/jwtModule";
import { z } from "zod";

const t = initTRPC.context<Context>().create()

export const authRoutes = t.router({
  login: t.procedure
    .input(z.object({
      userName: z.string(),
      password: z.string()
    }))
    .output(z.string())
    .mutation(async ({ input }) => {
      try {

        if (input.password === 'gpt') {

          const user = {
            name: input.userName,
            id: 'teste',
            avatar_url: ''
          }

          const access_token = jwtSigin({
            name: user.name,
            id: user.id,
          }, {
            expiresIn: 60 * 60
          })

          return access_token
        }

        throw new Error('Invalid Password!')


      } catch (err) {
        console.log(err)
        throw err
      }
    })
})
