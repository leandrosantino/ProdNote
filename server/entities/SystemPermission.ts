export const systemPermissionList = [
  'GENERATE_TAGS',
  'READ_TAGS',
  'PLANNING',
  'CREATE_USERS',
  'OEE_NOTE',
  'ROOT'
] as const

export type SystemPermissionKeys = typeof systemPermissionList[number]

export interface SystemPermission {
  id: string
  description: SystemPermissionKeys
}
