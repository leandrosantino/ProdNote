import { type SystemPermission } from '../../../entities/SystemPermission'
import { type ISystemPermissionsRepository } from '../../interfaces/ISystemPermissionsRepository'

const permission: SystemPermission[] = [
  {
    id: 1,
    description: 'GENERATE_TAGS'
  },
  {
    id: 2,
    description: 'PLANNING'
  },
  {
    id: 3,
    description: 'READ_TAGS'
  },
  {
    id: 4,
    description: 'CREATE_USERS'
  }
]

export class SystemPermissionRepository implements ISystemPermissionsRepository {
  async findAll () {
    return permission
  }

  async findManyById (ids: number[]) {
    const resp = [] as SystemPermission[]

    ids.forEach(id => {
      permission.forEach(entry => {
        entry.id === id && resp.push(entry)
      })
    })

    return resp
  }
}
