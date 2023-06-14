import { z } from 'zod'

export const createUserRequestDTOSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  permissions: z.array(z.number())
})

export const createUserResponseDTOschema = z.object({
  message: z.string()
})

export type ICreateUserResponseDTO = z.infer<typeof createUserResponseDTOschema>

export type ICreateUserRequestDTO = z.infer<typeof createUserRequestDTOSchema>
