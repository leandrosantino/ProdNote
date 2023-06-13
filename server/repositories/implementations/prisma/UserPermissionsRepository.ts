import { UserPermission } from "../../../entities/UserPermission"
import { IUsersPermissionsRepository } from "../../interfaces/IUsersPermissionsRepository"

export class UsersRepository implements IUsersPermissionsRepository {

  async findAll() {
    return [] as UserPermission[]
  }

  async create(data: UserPermission) {
    console.log(data)
    return {} as UserPermission
  }

  async delete(id: string) {
    console.log(id)
  }

  async update(id: string, data: UserPermission) {
    console.log(id, data)
    return {} as UserPermission
  }

  async findById(id: string) {
    console.log(id)
    return {} as UserPermission
  }

}
