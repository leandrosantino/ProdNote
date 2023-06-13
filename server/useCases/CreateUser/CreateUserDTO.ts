import { z } from 'zod'

export const createUserRequestDTOSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
})

export type ICreateUserRequestDTO = z.infer<typeof createUserRequestDTOSchema>
