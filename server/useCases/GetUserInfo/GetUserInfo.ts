import { IUsersRepository } from '../../repositories/IUsersRepository'
import { GetUserInfoResponseDTO, GetUserInfoRequestDTO } from './GetUserInfoDTO'

export class GetUserInfo {
  constructor(
    public userRepository: IUsersRepository
  ) { }

  async execute(name: GetUserInfoRequestDTO) {
    const user = await this.userRepository.findByName(name)

    if (!user) {
      throw new Error('User not found')
    }

    return {
      email: user.email,
      name: user.name,
      permissions: user.permissions.map(permission => permission.description)
    } as GetUserInfoResponseDTO

  }

}
