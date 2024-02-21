import { type IUsersRepository } from '../../interfaces/IUsersRepository'
import { type UpdateUserRequestDTO, type UpdateUserResponseDTO } from './UpdateUserDTO'
import { type ISystemPermissionsRepository } from '../../interfaces/ISystemPermissionsRepository'
import { type IPassProvider } from '../../providers/interfaces/IPassProvider'

export class UpdateUser {
  constructor (
    private readonly usersRepository: IUsersRepository,
    private readonly systemPermissionsRepository: ISystemPermissionsRepository,
    private readonly passProvider: IPassProvider
  ) { }

  async execute ({ data, id }: UpdateUserRequestDTO): Promise<UpdateUserResponseDTO> {
    const { name, permissions, email, password } = data

    if (permissions.length < 1) {
      throw new Error('No permissions were granted, the system does not allow users without permissions')
    }
    const userPermissions = await this.systemPermissionsRepository
      .findManyByDescriptionList(permissions)

    let encryptedPassword: string | undefined
    if (password) {
      encryptedPassword = this.passProvider.generate(password)
    }

    await this.usersRepository.update(id, {
      name, email, password: encryptedPassword
    }, userPermissions.map(entry => entry.id))

    return { message: 'User updated successfully' }
  }
}
