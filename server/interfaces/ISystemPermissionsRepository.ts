import { type SystemPermission } from '../entities/SystemPermission'

export interface ISystemPermissionsRepository {
  create: (data: Omit<SystemPermission, 'id'>) => Promise<SystemPermission>
  findAll: () => Promise<SystemPermission[]>
  findManyByDescriptionList: (descriptions: Array<SystemPermission['description']>) => Promise<SystemPermission[]>
}
