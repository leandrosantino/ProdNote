import { initTRPC } from '@trpc/server'
import { Context } from '../context'
import { SystemPermissionKeys } from '../entities/SystemPermission'
import { UsersRepository } from '../repositories/implementations/prisma/UsersRepository'
import { HttpError } from '../utils/HttpError'
const t = initTRPC.context<Context>().create()

export function requiredPermissionMiddleware(requiredPermission: SystemPermissionKeys) {

  const userRepository = new UsersRepository()

  return t.middleware(async ({ ctx, next }) => {

    const user = await userRepository.findById(ctx.user?.id)

    if (!user) {
      throw new HttpError({ code: 'UNAUTHORIZED', message: 'User not found' })
    }

    if (!(
      user.permissions
        .map(entry => entry.description)
        .includes(requiredPermission)
    )) {
      throw new HttpError({
        code: 'UNAUTHORIZED',
        message: 'The user does not have the required permissions for this request'
      })
    }

    return next()

  })

}
