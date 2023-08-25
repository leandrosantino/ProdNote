import { type Machine } from '../../entities/Machine'
import { csvReader } from '../../utils/csvReader'
import { logger } from '../../utils/logger'
import { Repositories } from '../repositories'
import path from 'path'

export async function machinesSeed () {
  const machineRepository = new Repositories.Machine()
  logger.success('\nSeeding Machines Table')
  try {
    const machines: Machine[] = (await csvReader(
      path.join(__dirname, '../../../prisma/machines.csv')
    ))
      .filter((_, index) => index > 0)
      .map(row => ({
        capacity: 0,
        slug: row[0],
        ute: row[0]
      }))

    for await (const machine of machines) {
      logger.info('   - add ' + machine.slug)
      await machineRepository.create(machine)
    }
  } catch (err) {
    logger.error(err)
  }
}
