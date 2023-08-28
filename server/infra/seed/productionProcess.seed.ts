import { csvReader } from '../../utils/csvReader'
import { logger } from '../../utils/logger'
import path from 'path'
import { type ProductionProcess } from '../../entities/ProductionProcess'
import { Repositories } from '../repositories'

const machinesRepository = new Repositories.Machine()
const productRepository = new Repositories.Product()
const productionProcessRepository = new Repositories.ProductionProcess()

export async function productionProcessSeed () {
  logger.success('\nSeeding Production Process Table')
  try {
    interface CreateProcess extends Omit<ProductionProcess, 'machines' | 'product' | 'productId'> {
      sapCode: string
    }

    const processes: CreateProcess[] = (await csvReader(
      path.join(__dirname, '../../../prisma/productionProcess.csv')
    ))
      .filter((_, index) => index > 0)
      .map(row => ({
        projectNumber: row[0],
        sapCode: String(row[1]),
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
          .split(',').map(slug => slug.trim())
      }

      for await (const index of machines.keys()) {
        try {
          const machine = await machinesRepository.findBySlug(machines[index])
          if (machine) machines[index] = machine?.id as string
        } catch {}
      }

      logger.info('   - add ' + process.description)
      const product = await productRepository.findBySapCode(process.sapCode)
      // console.log(product.id)
      await productionProcessRepository.create({
        data: {
          description: process.description,
          cycleTimeInSeconds: process.cycleTimeInSeconds,
          projectNumber: process.projectNumber,
          technology: process.technology,
          ute: process.ute,
          productId: product.id as string
        },
        machines
      })
    }
  } catch (err) {
    logger.error(err)
  }
}

// productionProcessSeed().catch(console.log)
