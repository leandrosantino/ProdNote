import { z } from 'zod'

export const userAuthRequestDTOSchema = z.object({
  userName: z.string(),
  password: z.string()
})

export const userAuthResponseDTOSchema = z.string().optional()

export type IUserAuthRequestDTO = z.infer<typeof userAuthRequestDTOSchema>
export type IUserAuthResponseDTO = z.infer<typeof userAuthResponseDTOSchema>
