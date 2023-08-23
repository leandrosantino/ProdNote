import { Repositories } from '../../infra/repositories'
import { CreateUser } from './CreateUser'
import { PassProvider } from '../../providers/implementations/PassProvider'

const usersRepository = new Repositories.Users()
const systemPermissionRepository = new Repositories.SystemPermission()
const passProvider = new PassProvider()

export const createUser = new CreateUser(
  usersRepository,
  systemPermissionRepository,
  passProvider
)
