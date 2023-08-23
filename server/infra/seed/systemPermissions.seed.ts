import { systemPermissionList } from '../../entities/SystemPermission'
import { logger } from '../../utils/logger'
import { Repositories } from '../repositories'

export async function systemPermisionsSeed () {
  const systemPermissionRepository = new Repositories.SystemPermission()
  logger.success('\nSeeding SystemPermission Table')
  try {
    const permissions = [...systemPermissionList]
      .map(permission => ({
        description: permission
      }))

    for await (const permission of permissions) {
      logger.info('   - add ' + permission.description)
      await systemPermissionRepository.create(permission)
    }
  } catch (err) {
    logger.error(err)
  }
}
