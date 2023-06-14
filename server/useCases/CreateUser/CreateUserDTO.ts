import { z } from 'zod'

export const createUserRequestDTOSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  permissions: z.array(z.number())
})

export type ICreateUserRequestDTO = z.infer<typeof createUserRequestDTOSchema>
