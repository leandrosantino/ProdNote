import { type ReasonsLossEfficiency } from '../server/entities/ReasonsLossEfficiency'
import { logger } from '../server/utils/logger'
import { Repositories } from '../server/infra/repositories'
import { csvReader } from '../server/utils/csvReader'
import path from 'path'

export async function reasonsLossEfficiencySeed () {
  const reasonsLossEfficiencyRepository = new Repositories.ReasonsLossEfficiency()
  logger.success('\nSeeding  ReasonsLossEfficiency Table')
  try {
    const reasons:
    Array<Omit<ReasonsLossEfficiency, 'id' | 'productionEfficiencyLosses'>> = (await csvReader(
      path.join(__dirname, './src/ReasonsLoss.csv')
    ))
      .filter((_, index) => index > 0)
      .map(entry => ({
        description: entry[0],
        type: entry[1] as ReasonsLossEfficiency['type'],
        classification: entry[2] as ReasonsLossEfficiency['classification']
      }))

    for await (const reason of reasons) {
      logger.info('   - add ' + reason.type + ' - ' + reason.description)
      await reasonsLossEfficiencyRepository.create(reason)
    }
  } catch (err) {
    logger.error(err)
  }
}
