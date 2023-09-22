import { systemPermissionList } from '../server/entities/SystemPermission'
import { createUser } from '../server/useCases/CreateUser'
import { type CreateUserRequestDTO } from '../server/useCases/CreateUser/CreateUserDTO'
import { logger } from '../server/utils/logger'

export async function usersSeed () {
  logger.success('\nSeeding Users Table')
  try {
    const users: CreateUserRequestDTO[] = [
      {
        name: 'producao',
        password: 'PROD@adler',
        email: 'prod@email.com',
        permissions: [
          'GENERATE_TAGS',
          'READ_TAGS'
        ]
      },
      {
        name: 'ADMIN@adler',
        password: 'frd4aws2',
        email: 'emailadmin@adler.com',
        permissions: [...systemPermissionList]
      },
      {
        email: 'alder1@email.com',
        name: 'oeeute1',
        password: 'UTE1@adler',
        permissions: [
          'OEE_NOTE'
        ]
      },
      {
        email: 'alder2@email.com',
        name: 'oeeute2',
        password: 'UTE2@adler',
        permissions: [
          'OEE_NOTE'
        ]
      },
      {
        email: 'alder3@email.com',
        name: 'oeeute3',
        password: 'UTE3@adler',
        permissions: [
          'OEE_NOTE'
        ]
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
        email: 'alder4@email.com',
        name: 'oeeute5',
        password: 'UTE5@adler',
        permissions: [
          'OEE_NOTE'
        ]
      },
      {
        email: 'alder5@email.com',
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
