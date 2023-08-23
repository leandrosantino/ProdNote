import { systemPermissionList } from '../../entities/SystemPermission'
import { createUser } from '../../useCases/CreateUser'
import { type CreateUserRequestDTO } from '../../useCases/CreateUser/CreateUserDTO'
import { logger } from '../../utils/logger'

export async function usersSeed () {
  logger.success('\nSeeding Users Table')
  try {
    const users: CreateUserRequestDTO[] = [
      {
        name: 'PROD@teste',
        password: 'alpha45c',
        email: 'leandrosantino2013@gmail.com',
        permissions: [
          'GENERATE_TAGS',
          'PLANNING',
          'READ_TAGS'
        ]
      },
      {
        name: 'ADMIN@adler',
        password: 'admin123',
        email: 'email@adler.com',
        permissions: [...systemPermissionList]
      }
    ]

    for await (const user of users) {
      logger.info('   - add ' + user.name)
      await createUser.execute(user)
    }
  } catch (err) {
    logger.error(err)
  }
}
