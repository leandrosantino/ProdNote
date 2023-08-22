const systemPermissionList = [
  'GENERATE_TAGS',
  'READ_TAGS',
  'PLANNING',
  'CREATE_USERS'
] as const

export type SystemPermissionKeys = typeof systemPermissionList[number]

export interface SystemPermission {
  id: string
  description: SystemPermissionKeys
}
