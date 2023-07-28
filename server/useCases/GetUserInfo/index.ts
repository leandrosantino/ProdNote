import { GetUserInfo } from './GetUserInfo'
import { Repositories } from '../../repositories/implementations'

const usersRepository = new Repositories.Users()

export const getUserInfo = new GetUserInfo(
  usersRepository
)
