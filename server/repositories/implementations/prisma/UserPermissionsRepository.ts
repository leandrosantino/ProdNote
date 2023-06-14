import { UserPermission } from "../../../entities/UserPermission"
import { IUsersPermissionsRepository } from "../../IUsersPermissionsRepository"

export class UsersRepository implements IUsersPermissionsRepository {

  async findAll() {
    return [] as UserPermission[]
  }

  async findById(id: string) {
    console.log(id)
    return {} as UserPermission
  }

}
