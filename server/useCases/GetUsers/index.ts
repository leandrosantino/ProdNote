import { GetUsers } from './GetUsers'
import { Repositories } from '../../infra/repositories'

const usersRepository = new Repositories.Users()

export const getUsers = new GetUsers(
  usersRepository
)
