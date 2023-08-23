import { type SystemPermission } from '../entities/SystemPermission'
import { type User } from '../entities/User'

export interface IUsersRepository {
  findByName: (userName: string) => Promise<User | null>
  findById: (userId: string) => Promise<User | null>
  create: (data: Omit<User, 'permissions'>, permissions: Array<SystemPermission['id']>) => Promise<User>
}
