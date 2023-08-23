import { type SystemPermission } from '@prisma/client'
import { type User } from '../../../entities/User'
import { type IUsersRepository } from '../../../interfaces/IUsersRepository'
import { prisma } from './connection'

export class UsersRepository implements IUsersRepository {
  async create (data: Omit<User, 'permissions'>, permissions: Array<SystemPermission['id']>) {
    const user = await prisma.user.create({
      data: {
        ...data,
        permissions: {
          connect: permissions.map(id => ({ id }))
        }
      }
    })
    return user as User
  }

  async findByName (userName: string) {
    const user = await prisma.user.findUnique({
      where: { name: userName },
      include: {
        permissions: true
      }
    })
    if (!user) {
      return null
    }
    return user as User
  }

  async findById (userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        permissions: true
      }
    })
    if (!user) {
      return null
    }
    return user as User
  }
}
