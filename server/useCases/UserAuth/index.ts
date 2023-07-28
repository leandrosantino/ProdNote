import { UserAuth } from './UserAuth'
import { JwtProvider } from '../../providers/implementations/JwtProvider'
import { PassProvider } from '../../providers/implementations/PassProvider'
import { Repositories } from '../../repositories/implementations'

const userRepository = new Repositories.Users()
const jwt = new JwtProvider()
const pass = new PassProvider()

export const userAuth = new UserAuth(
  userRepository,
  jwt,
  pass
)
