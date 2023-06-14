import { z } from "zod";

export const userAuthRequestDTOSchema = z.object({
  userName: z.string(),
  password: z.string(),
})


export type IUserAuthRequestDTO = z.infer<typeof userAuthRequestDTOSchema>
