import { type IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { type ISystemPermissionsRepository } from '../../repositories/interfaces/ISystemPermissionsRepository'
import { type SystemPermission } from '../../entities/SystemPermission'
import { CreateUser } from './CreateUser'

describe('tests users creation', () => {
  const userRepoMock = {
    async findByName (userName) {
      return userName === 'leandro' ? {} : null
    },
    async create (data) {
      return data ? {} : ''
    }

  } as IUsersRepository

  const permissions: SystemPermission[] = [
    { id: 1, description: 'CREATE_USERS' },
    { id: 2, description: 'PLANNING' },
    { id: 3, description: 'READ_TAGS' }
  ]

  const systemPermissionsRepoMock = {
    async findManyById (ids) {
      return permissions.map((entry) => {
        for (const id of ids) {
          if (id === entry.id) return entry
        }
      })
    }
  } as ISystemPermissionsRepository

  const createUser = new CreateUser(
    userRepoMock,
    systemPermissionsRepoMock
  )

  test('should successfully create user', async () => {
    await expect(createUser.execute({
      email: 'leandrosantino',
      name: 'leandro45',
      password: '12345',
      permissions: [1, 2]
    })).resolves.toStrictEqual({ message: 'User registered successfully' })
  })

  test('should exception throw if username is already registered', async () => {
    await expect(createUser.execute({
      email: 'leandrosantino@gmail.com',
      name: 'leandro',
      password: 'alpha45c',
      permissions: [1, 2]
    })).rejects.toEqual(new Error('User already registered'))
  })

  test('should exception throw if no permissions were granted', async () => {
    await expect(createUser.execute({
      email: 'leandrosantino@gmail.com',
      name: 'leandro36',
      password: 'alpha45c',
      permissions: []
    })).rejects.toEqual(new Error('No permissions were granted, the system does not allow users without permissions'))
  })
})
