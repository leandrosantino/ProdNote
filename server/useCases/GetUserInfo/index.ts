import { GetUserInfo } from './GetUserInfo'
import { Repositories } from '../../infra/repositories'

const usersRepository = new Repositories.Users()

export const getUserInfo = new GetUserInfo(
  usersRepository
)
