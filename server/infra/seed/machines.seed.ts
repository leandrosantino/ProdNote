import { type Machine } from '../../entities/Machine'
import { logger } from '../../utils/logger'
import { Repositories } from '../repositories'

export async function machinesSeed () {
  const machineRepository = new Repositories.Machine()
  logger.success('\nSeeding Machines Table')
  try {
    const machines: Machine[] = [
      {
        capacity: 27,
        id: '1',
        slug: 'M15',
        ute: 'UTE-3'
      },
      {
        capacity: 15,
        id: '2',
        slug: 'M16',
        ute: 'UTE-3'
      }
    ]

    for await (const machine of machines) {
      logger.info('   - add ' + machine.slug)
      await machineRepository.create(machine)
    }
  } catch (err) {
    logger.error(err)
  }
}
