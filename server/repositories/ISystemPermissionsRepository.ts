import { type SystemPermission } from '../entities/SystemPermission'

export interface ISystemPermissionsRepository {
  findAll: () => Promise<SystemPermission[]>
  findManyById: (ids: number[]) => Promise<SystemPermission[]>
}
