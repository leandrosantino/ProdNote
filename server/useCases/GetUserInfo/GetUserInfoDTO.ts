import { type SystemPermissionKeys } from '../../entities/SystemPermission'

export type GetUserInfoRequestDTO = string

export class GetUserInfoResponseDTO {
  constructor (
    public id: string,
    public name: string,
    public email: string,
    public permissions: SystemPermissionKeys[]
  ) {}
}
