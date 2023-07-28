import { z } from 'zod'

export const systemPermissionList = [
  'GENERATE_TAGS',
  'READ_TAGS',
  'PLANNING',
  'CREATE_USERS'
] as const

export type SystemPermissionKeys = typeof systemPermissionList[number]

export class SystemPermission {
  constructor (
    public id: string,
    public description: SystemPermissionKeys
  ) {}
}

export const systemPermissionsSchema = z.instanceof(SystemPermission)
