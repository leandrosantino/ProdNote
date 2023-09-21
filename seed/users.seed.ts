import { systemPermissionList } from '../server/entities/SystemPermission'
import { createUser } from '../server/useCases/CreateUser'
import { type CreateUserRequestDTO } from '../server/useCases/CreateUser/CreateUserDTO'
import { logger } from '../server/utils/logger'

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
          'READ_TAGS'
        ]
      },
      {
        name: 'ADMIN@adler',
        password: 'admin123',
        email: 'email@adler.com',
        permissions: [...systemPermissionList]
      },
      {
        email: 'alder@email.com',
        name: 'oeeute4',
        password: 'UTE4@adler',
        permissions: [
          'OEE_NOTE'
        ]
      },
      {
        email: 'alder@email.com',
        name: 'oeeute2',
        password: 'UTE2@adler',
        permissions: [
          'OEE_NOTE'
        ]
      },
      {
        email: 'alder@email.com',
        name: 'oeeAdmin',
        password: 'ADM@oee',
        permissions: [
          'OEE_NOTE',
          'OEE_ADMIN'
        ]
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
