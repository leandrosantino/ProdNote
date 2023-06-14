import { z } from 'zod'

export const systemPermissionKeysShema = z
  .literal('GENERATE_TAGS')
  .or(z.literal('READ_TAGS'))
  .or(z.literal('PLANNING'))
  .or(z.literal('CREATE_USERS'))

export const systemPermissionsSchema = z.object({
  id: z.number(),
  description: systemPermissionKeysShema
})

export type SystemPermissionKeys = z.infer<typeof systemPermissionKeysShema>

export type SystemPermission = z.infer<typeof systemPermissionsSchema>
