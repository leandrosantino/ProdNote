import { type ReasonsLossEfficiency } from '../../entities/ReasonsLossEfficiency'
import CsvReadableStream from 'csv-reader'
import { logger } from '../../utils/logger'
import fs from 'fs'
import path from 'path'
import { Repositories } from '../repositories'

export async function reasonsLossEfficiencySeed () {
  const reasonsLossEfficiencyRepository = new Repositories.ReasonsLossEfficiency()
  logger.success('\nSeeding  ReasonsLossEfficiency Table')
  try {
    const reasons = await readCsv()
    for await (const reason of reasons) {
      logger.info('   - add ' + reason.type + ' - ' + reason.description)
      await reasonsLossEfficiencyRepository.create(reason)
    }
  } catch (err) {
    logger.error(err)
  }
}

async function readCsv () {
  type ReasonsLossEfficiencyCreateType = Omit<ReasonsLossEfficiency, 'id' | 'productionEfficiencyLosses'>
  return await new Promise<ReasonsLossEfficiencyCreateType[]>((resolve, reject) => {
    const data: ReasonsLossEfficiencyCreateType[] = []
    const inputStream = fs.createReadStream(path.join(__dirname, '../../../prisma/ReasonsLoss.csv'), 'utf8')
    inputStream
      .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, delimiter: ';' }))
      .on('data', function (row) {
        data.push({
          description: row[0],
          type: row[1] as ReasonsLossEfficiency['type']
        })
      })
      .on('end', function () {
        resolve(data)
      })
      .on('error', (err) => { reject(err) })
  })
}
