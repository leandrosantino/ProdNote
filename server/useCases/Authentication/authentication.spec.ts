import { type IUsersRepository } from '../../interfaces/IUsersRepository'
import { type IJwtProvider } from '../../providers/interfaces/IJwtProvider'
import { type IPassProvider } from '../../providers/interfaces/IPassProvider'
import { Authentication } from './Authentication'
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

  const authentication = new Authentication(
    usersRepository,
    jwt,
    pass
  )

  test('should auth user successfully', async () => {
    await expect(authentication.execute({
      userName: 'leandro',
      password: 'google'
    }))
      .resolves.toEqual('lkahsdoaibfiawhoiawjdaiwd')
  })

  test('should exception throw if username not found', async () => {
    await expect(authentication.execute({
      userName: 'joão',
      password: 'google'
    }))
      .rejects.toStrictEqual(Error('Unregistered User'))
  })

  test('should exception throw if invalid password', async () => {
    await expect(authentication.execute({
      userName: 'leandro',
      password: 'pass'
    }))
      .rejects.toStrictEqual(Error('Invalid Password!'))
  })
})
