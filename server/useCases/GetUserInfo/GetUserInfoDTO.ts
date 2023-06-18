import { z } from 'zod'
import { systemPermissionKeysShema } from '../../entities/SystemPermission'

export const getUserInfoResponseDTOschema = z.object({
  name: z.string(),
  email: z.string(),
  permissions: z.array(systemPermissionKeysShema)
})

export const getUserInfoRequestDTOschema = z.string()

export type GetUserInfoRequestDTO = z.infer<typeof getUserInfoRequestDTOschema>
export type GetUserInfoResponseDTO = z.infer<typeof getUserInfoResponseDTOschema>
