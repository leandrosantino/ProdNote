import { type IUsersRepository } from '../../repositories/IUsersRepository'
import { type IJwtProvider } from '../../providers/IJwtProvider'
import { type IPassProvider } from '../../providers/IPassProvider'
import { UserAuth } from './UserAuth'
import { type User } from '../../entities/User'

describe('tests user authentication', () => {
  const user: User = {
    email: 'leandrosantino@google.com',
    name: 'leandro',
    password: 'google',
    permissions: [
      { description: 'CREATE_USERS', id: 1 }
    ],
    id: '22'
  }

  const token = 'lkahsdoaibfiawhoiawjdaiwd'

  const usersRepository = {
    async findByName (userName) {
      if (user.name === userName) {
        return user
      }
      return null
    }

  } as IUsersRepository

  const jwt = {
    sign (data, options) {
      if (data && options) {
        return token
      }
    }
  } as IJwtProvider

  const pass = {
    verify (loginPass, registeredHash) {
      if (loginPass === registeredHash) {
        return true
      }
      return false
    }
  } as IPassProvider

  const userAuth = new UserAuth(
    usersRepository,
    jwt,
    pass
  )

  test('should auth user successfully', async () => {
    await expect(userAuth.execute({
      userName: 'leandro',
      password: 'google'
    }))
      .resolves.toEqual('lkahsdoaibfiawhoiawjdaiwd')
  })

  test('should exception throw if username not found', async () => {
    await expect(userAuth.execute({
      userName: 'joão',
      password: 'google'
    }))
      .rejects.toStrictEqual(Error('Unregistered User'))
  })

  test('should exception throw if invalid password', async () => {
    await expect(userAuth.execute({
      userName: 'leandro',
      password: 'pass'
    }))
      .rejects.toStrictEqual(Error('Invalid Password!'))
  })
})
