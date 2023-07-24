import { type IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { type ICreateUserRequestDTO, type ICreateUserResponseDTO } from './CreateUserDTO'
import { type ISystemPermissionsRepository } from '../../repositories/interfaces/ISystemPermissionsRepository'

export class CreateUser {
  constructor (
    private readonly usersRepository: IUsersRepository,
    private readonly systemPermissionsRepository: ISystemPermissionsRepository
  ) { }

  async execute (data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    const { name, permissions, email, password } = data

    const user = await this.usersRepository.findByName(name)

    if (user != null) {
      throw new Error('User already registered')
    }

    if (permissions.length < 1) {
      throw new Error('No permissions were granted, the system does not allow users without permissions')
    }

    const userPermissions = await this.systemPermissionsRepository
      .findManyByIdList(permissions)

    await this.usersRepository.create({
      name, email, password, permissions: userPermissions
    })

    return { message: 'User registered successfully' }
  }
}
