import { z } from 'zod'

export const userPermissionsSchema = z.object({
  id: z.string(),
  description: z.string(),
})

export type UserPermission = z.infer<typeof userPermissionsSchema>
