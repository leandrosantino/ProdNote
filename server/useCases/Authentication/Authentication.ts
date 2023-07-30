import { type IUsersRepository } from '../../interfaces/IUsersRepository'
import { type AuthenticationRequestDTO } from './AuthenticationDTO'
import { type IPassProvider } from '../../providers/interfaces/IPassProvider'
import { type ITokenManagement } from '../../interfaces/ITokenManagement'

export class Authentication {
  constructor (
    private readonly usersRepository: IUsersRepository,
    private readonly tokenManagement: ITokenManagement,
    private readonly pass: IPassProvider
  ) { }

  async execute (data: AuthenticationRequestDTO) {
    const user = await this.usersRepository.findByName(data.userName)

    if (!user?.id) {
      throw new Error('Unregistered User')
    }

    if (this.pass.verify(data.password, user.password)) {
      const accessToken = await this.tokenManagement.generate({
        name: user.name,
        id: user.id,
        permissions: user.permissions.map(permission => permission.description)
      })

      return accessToken
    }

    throw new Error('Invalid Password!')
  }
}
