import { type IUsersRepository } from '../../interfaces/IUsersRepository'
import { type CreateUserRequestDTO, type CreateUserResponseDTO } from './CreateUserDTO'
import { type ISystemPermissionsRepository } from '../../interfaces/ISystemPermissionsRepository'
import { type IPassProvider } from '../../providers/interfaces/IPassProvider'

export class CreateUser {
  constructor (
    private readonly usersRepository: IUsersRepository,
    private readonly systemPermissionsRepository: ISystemPermissionsRepository,
    private readonly passProvider: IPassProvider
  ) { }

  async execute (data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const { name, permissions, email, password } = data

    const user = await this.usersRepository.findByName(name)

    if (user != null) {
      throw new Error('User already registered')
    }

    if (permissions.length < 1) {
      throw new Error('No permissions were granted, the system does not allow users without permissions')
    }

    const userPermissions = await this.systemPermissionsRepository
      .findManyByDescriptionList(permissions)

    const encryptedPassword = this.passProvider.generate(password)

    await this.usersRepository.create({
      name, email, password: encryptedPassword
    }, userPermissions.map(entry => entry.id))

    return { message: 'User registered successfully' }
  }
}
