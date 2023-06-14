
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { ISystemPermissionsRepository } from '../../repositories/ISystemPermissionsRepository'

export class CreateUser {
  constructor(
    private usersRepository: IUsersRepository,
    private systemPermissionsRepository: ISystemPermissionsRepository
  ) { }

  async execute({ name, permissions, email, password }: ICreateUserRequestDTO) {

    const user = await this.usersRepository.findByName(name)

    if (user) {
      throw new Error('User already registered')
    }

    if (permissions.length < 1) {
      throw new Error('No permissions were granted, the system does not allow users without permissions')
    }

    const userPermissions = await this.systemPermissionsRepository
      .findManyById(permissions)

    await this.usersRepository.create({
      name, email, password, permissions: userPermissions
    })

    return { message: 'User registered successfully' }

  }

  async listAllSystemPermission() {
    return await this.systemPermissionsRepository.findAll()
  }





}
