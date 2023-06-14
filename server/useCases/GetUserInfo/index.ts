import { GetUserInfo } from './GetUserInfo'
import { UsersRepository } from '../../repositories/implementations/prisma/UsersRepository'

const usersRepository = new UsersRepository()

export const getUserInfo = new GetUserInfo(
  usersRepository
)
