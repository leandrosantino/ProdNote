import { type IUsersRepository } from '../../repositories/IUsersRepository'
import { type IUserAuthRequestDTO, type IUserAuthResponseDTO } from './UserAuthDTO'
import { type IJwtProvider } from '../../providers/IJwtProvider'
import { type IPassProvider } from '../../providers/IPassProvider'

export class UserAuth {
  constructor (
    public usersRepository: IUsersRepository,
    public jwt: IJwtProvider,
    public pass: IPassProvider
  ) { }

  async execute (data: IUserAuthRequestDTO) {
    const user = await this.usersRepository.findByName(data.userName)

    if (user == null) {
      throw new Error('Unregistered User')
    }

    if (this.pass.verify(data.password, user.password)) {
      const access_token: IUserAuthResponseDTO = this.jwt.sign({
        name: user.name,
        id: user.id as string
      }, {
        expiresIn: '1 days'
      })

      return access_token
    }

    throw new Error('Invalid Password!')
  }
}
