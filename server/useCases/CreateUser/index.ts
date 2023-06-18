import { UsersRepository } from '../../repositories/implementations/prisma/UsersRepository'
import { SystemPermissionRepository } from '../../repositories/implementations/prisma/SystemPermissionsRepository'
import { CreateUser } from './CreateUser'

const usersRepository = new UsersRepository()
const systemPermissionRepository = new SystemPermissionRepository()

export const createUser = new CreateUser(
  usersRepository,
  systemPermissionRepository
)
