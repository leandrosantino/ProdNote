import { Repositories } from '../../infra/repositories'
import { CreateUser } from './CreateUser'

const usersRepository = new Repositories.Users()
const systemPermissionRepository = new Repositories.SystemPermission()

export const createUser = new CreateUser(
  usersRepository,
  systemPermissionRepository
)
