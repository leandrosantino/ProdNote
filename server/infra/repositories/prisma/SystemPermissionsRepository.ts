import { type SystemPermission } from '../../../entities/SystemPermission'
import { type ISystemPermissionsRepository } from '../../../interfaces/ISystemPermissionsRepository'
import { prisma } from './connection'

// const permission: SystemPermission[] = [
//   {
//     id: '1',
//     description: 'GENERATE_TAGS'
//   },
//   {
//     id: '2',
//     description: 'PLANNING'
//   },
//   {
//     id: '3',
//     description: 'READ_TAGS'
//   },
//   {
//     id: '4',
//     description: 'CREATE_USERS'
//   }
// ]

export class SystemPermissionRepository implements ISystemPermissionsRepository {
  async findAll () {
    const permissions = await prisma.systemPermission.findMany()
    return permissions as SystemPermission[]
  }

  async findManyByIdList (ids: Array<SystemPermission['id']>) {
    const permissions = await prisma.systemPermission.findMany({
      where: {
        OR: ids.map(id => ({ id }))
      }
    })

    return permissions as SystemPermission[]
  }
}
