import { SystemPermission } from "../entities/SystemPermission";


export type ISystemPermissionsRepository = {
  findAll(): Promise<SystemPermission[]>
  findManyById(ids: number[]): Promise<SystemPermission[]>
}

