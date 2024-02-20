import { type IUsersRepository } from '../../interfaces/IUsersRepository'

export class GetUsers {
  constructor (
    private readonly userRepository: IUsersRepository
  ) { }

  async execute () {
    const users = await this.userRepository.getAll()
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      permissions: user.permissions.map(permission => permission.description)
    }))
  }
}
