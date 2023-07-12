import { type IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { GetUserInfo } from '../GetUserInfo/GetUserInfo'
import { type GetUserInfoResponseDTO } from '../../useCases/GetUserInfo/GetUserInfoDTO'
import { type User } from '../../entities/User'

describe('tests get user info', () => {
  const user: User = {
    id: '111',
    email: 'leandro@gmail.co',
    name: 'leandro',
    password: 'test',
    permissions: [
      { id: 1, description: 'CREATE_USERS' },
      { id: 2, description: 'GENERATE_TAGS' }
    ]
  }

  const userResponseDTO: GetUserInfoResponseDTO = {
    email: user.email,
    name: user.name,
    permissions: ['CREATE_USERS', 'GENERATE_TAGS']
  }

  const userRepoMock = {
    async findById (userId) {
      if (user.id === userId) {
        return user
      }
      return null
    }
  } as IUsersRepository

  const getUserInfo = new GetUserInfo(
    userRepoMock
  )

  test('should return the user info', async () => {
    await expect(getUserInfo.execute('111'))
      .resolves.toStrictEqual(userResponseDTO)
  })

  test('should exception throw if user not found', async () => {
    await expect(getUserInfo.execute('333'))
      .rejects.toEqual(new Error('User not found'))
  })
})
