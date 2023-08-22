import { type SystemPermission } from '../entities/SystemPermission'

export interface ISystemPermissionsRepository {
  findAll: () => Promise<SystemPermission[]>
  findManyByIdList: (ids: Array<SystemPermission['id']>) => Promise<SystemPermission[]>
}
