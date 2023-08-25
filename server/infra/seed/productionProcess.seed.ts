import { csvReader } from '../../utils/csvReader'
import { logger } from '../../utils/logger'
import path from 'path'
import { type ProductionProcess } from '../../entities/ProductionProcess'
import { Repositories } from '../repositories'

const machinesRepository = new Repositories.Machine()
const productionProcessRepository = new Repositories.ProductionProcess()

export async function productionProcessSeed () {
  logger.success('\nSeeding Production Process Table')
  try {
    const processes: Array<Omit<ProductionProcess, 'machines' | 'products'>> = (await csvReader(
      path.join(__dirname, '../../../prisma/productionProcess.csv')
    ))
      .filter((_, index) => index > 0)
      .map(row => ({
        projectNumber: row[0],
        description: row[2],
        cycleTimeInSeconds: Number(row[3]),
        technology: row[4] as ProductionProcess['technology'],
        ute: row[5] as ProductionProcess['ute']
      }))

    for await (const process of processes) {
      const expressionResponse = process.description.match(/\(([^)]+)\)/)
      let machines: string[] = []
      if (expressionResponse) {
        machines = expressionResponse[1]
          .split(',')
      }

      for await (const index of machines.keys()) {
        const machine = await machinesRepository.findBySlug(machines[index])
        if (machine) machines[index] = machine?.id as string
      }

      productionProcessRepository.create({
        process
      })
    }
  } catch (err) {
    logger.error(err)
  }
}

productionProcessSeed().catch(console.log)
