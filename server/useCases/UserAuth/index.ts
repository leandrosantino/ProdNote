import { AuthUser } from './AuthUser'
import { UsersRepository } from '../../repositories/implementations/prisma/UsersRepository'

const userRepository = new UsersRepository()

export const authUser = new AuthUser(
  userRepository
)


