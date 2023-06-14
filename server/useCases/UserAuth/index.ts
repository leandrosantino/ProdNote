import { UserAuth } from './UserAuth'
import { UsersRepository } from '../../repositories/implementations/prisma/UsersRepository'
import { JwtProvider } from '../../providers/implementations/JwtProvider'
import { PassProvider } from '../../providers/implementations/PassProvider'

const userRepository = new UsersRepository()
const jwt = new JwtProvider()
const pass = new PassProvider()

export const userAuth = new UserAuth(
  userRepository,
  jwt,
  pass
)


