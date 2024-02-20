import { type SystemPermissionKeys } from '../../entities/SystemPermission'

export interface UpdateUserRequestDTO {
  data: {
    name: string
    email: string
    password: string
    permissions: SystemPermissionKeys[]
  }
  id: string
}

export class UpdateUserResponseDTO {
  constructor (
    public message: string
  ) {}
}
