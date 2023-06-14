import { IUsersRepository } from '../../repositories/IUsersRepository'
import { GetUserInfoResponseDTO, GetUserInfoRequestDTO } from './GetUserInfoDTO'

export class GetUserInfo {
  constructor(
    public userRepository: IUsersRepository
  ) { }

  async execute(id: GetUserInfoRequestDTO) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    return {
      name: user.name,
      email: user.email,
      permissions: user.permissions.map(permission => permission.description)
    } as GetUserInfoResponseDTO

  }

}
