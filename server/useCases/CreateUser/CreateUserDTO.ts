import { type SystemPermissionKeys } from '../../entities/SystemPermission'

export class CreateUserRequestDTO {
  constructor (
    public name: string,
    public email: string,
    public password: string,
    public permissions: SystemPermissionKeys[]
  ) {}
}

export class CreateUserResponseDTO {
  constructor (
    public message: string
  ) {}
}
