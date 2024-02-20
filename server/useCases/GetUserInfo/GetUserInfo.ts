import { type IUsersRepository } from '../../interfaces/IUsersRepository'
import { type GetUserInfoResponseDTO, type GetUserInfoRequestDTO } from './GetUserInfoDTO'

export class GetUserInfo {
  constructor (
    private readonly userRepository: IUsersRepository
  ) { }

  async execute (id: GetUserInfoRequestDTO) {
    const user = await this.userRepository.findById(id)

    if (user == null) {
      throw new Error('User not found')
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      permissions: user.permissions.map(permission => permission.description)
    } as GetUserInfoResponseDTO
  }
}
