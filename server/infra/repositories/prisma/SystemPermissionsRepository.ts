import { type SystemPermission } from '../../../entities/SystemPermission'
import { type ISystemPermissionsRepository } from '../../../interfaces/ISystemPermissionsRepository'
import { prisma } from './connection'

export class SystemPermissionRepository implements ISystemPermissionsRepository {
  async create (data: Omit<SystemPermission, 'id'>) {
    const permission = await prisma.systemPermission.create({ data })
    return permission as SystemPermission
  }

  async findAll () {
    const permissions = await prisma.systemPermission.findMany()
    return permissions as SystemPermission[]
  }

  async findManyByDescriptionList (descriptions: Array<SystemPermission['description']>) {
    const permissions = await prisma.systemPermission.findMany({
      where: {
        OR: descriptions.map(description => ({ description }))
      }
    })

    return permissions as SystemPermission[]
  }
}
