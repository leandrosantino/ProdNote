import { UserPermission } from "../entities/UserPermission";


export type IUsersPermissionsRepository = {
  findAll(): Promise<UserPermission[]>
  findById(id: string): Promise<UserPermission>
}

