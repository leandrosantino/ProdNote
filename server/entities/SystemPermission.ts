const systemPermissionList = [
  'GENERATE_TAGS',
  'READ_TAGS',
  'PLANNING',
  'CREATE_USERS'
] as const

export type SystemPermissionKeys = typeof systemPermissionList[number]

export class SystemPermission {
  constructor (
    public id: number,
    public description: SystemPermissionKeys
  ) {}
}
