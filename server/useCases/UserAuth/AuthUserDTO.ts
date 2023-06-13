import { z } from "zod";

export const authUserRequestDTOSchema = z.object({
  userName: z.string(),
  password: z.string(),
})


export type IAuthUserRequestDTO = z.infer<typeof authUserRequestDTOSchema>
