import { type IUsersRepository } from '../../repositories/IUsersRepository'
import { type ISystemPermissionsRepository } from '../../repositories/ISystemPermissionsRepository'
import { CreateUser } from './CreateUser'

test('Use Case : Create User', async () => {
  const userRepoMock = {
    async findByName (userName) {
      return userName === 'leandro' ? {} : null
    },
    async create (data) {
      return data ? {} : ''
    }
  } as IUsersRepository
  const systemPermissionsRepoMock = {
    async findManyById (ids) {
      return [
        { id: ids[0], description: 'CREATE_USERS' },
        { id: ids[1], description: 'PLANNING' }
      ]
    }
  } as ISystemPermissionsRepository

  const createUser = new CreateUser(
    userRepoMock,
    systemPermissionsRepoMock
  )

  expect(await createUser.execute({
    email: 'leandrosantino',
    name: 'leandro',
    password: '12345',
    permissions: [1, 2]
  })).toStrictEqual({ message: 'User registered successfully' })
})
