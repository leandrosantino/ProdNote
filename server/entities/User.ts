import { z } from 'zod'
import { userPermissionsSchema } from './UserPermission'

export const userSchema = z.object({
  name: z.string(),
  password: z.string(),
  id: z.string(),
  email: z.string(),
  permissions: z.array(userPermissionsSchema)
})

export type User = z.infer<typeof userSchema>

