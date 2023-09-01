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
        ute: row[5] as ProductionProcess['ute'],
        cavitiesNumber: Number(row[6])
      }))

    for await (const process of processes) {
      const expressionResponse = process.description.match(/\(([^)]+)\)/)
      let machineSlugs: string[] = []
      if (expressionResponse) {
        machineSlugs = expressionResponse[1]
          .split(',').map(slug => slug.trim())
        if (machineSlugs.length < 1) {
          machineSlugs = [expressionResponse[1].trim()]
        }
      }

      const machinesIds: string[] = []
      for await (const index of machineSlugs.keys()) {
        const machine = await machinesRepository.findBySlug(machineSlugs[index])
        if (machine) machinesIds.push(machine?.id as string)
      }

      logger.info('   - add ' + process.description)
      const product = await productRepository.findBySapCode(process.sapCode)
      await productionProcessRepository.create({
        data: {
          description: process.description,
          cycleTimeInSeconds: process.cycleTimeInSeconds,
          projectNumber: process.projectNumber,
          technology: process.technology,
          ute: process.ute,
          productId: product.id as string,
          cavitiesNumber: process.cavitiesNumber
        },
        machines: machinesIds
      })
    }
  } catch (err) {
    logger.error(err)
  }
}

// productionProcessSeed().catch(console.log)
