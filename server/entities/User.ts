import { z } from 'zod'
import { systemPermissionsSchema } from './SystemPermission'

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  password: z.string(),
  email: z.string(),
  permissions: z.array(systemPermissionsSchema)
})

export type User = z.infer<typeof userSchema>

