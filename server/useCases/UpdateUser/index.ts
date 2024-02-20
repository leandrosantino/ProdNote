import { Repositories } from '../../infra/repositories'
import { UpdateUser } from './UpdateUser'
import { PassProvider } from '../../providers/implementations/PassProvider'

const usersRepository = new Repositories.Users()
const systemPermissionRepository = new Repositories.SystemPermission()
const passProvider = new PassProvider()

export const updateUser = new UpdateUser(
  usersRepository,
  systemPermissionRepository,
  passProvider
)
