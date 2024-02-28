import { type ProductionProcess } from '@prisma/client'
import { type ProductionProcessRepository } from '../../infra/repositories/prisma/ProductionProcessRepository'

const SECONDS_IN_ONE_HOUR = 3600
const MINUTES_IN_ONE_HOUR = 60

export class CalculateLoss {
  constructor (
    private readonly productionProcessRepository: ProductionProcessRepository
  ) {}

  async execute (processId: ProductionProcess['id'], quantityProduced: number, productionTimeInMinutes: number) {
    const process = await this.productionProcessRepository.findById(processId)

    if (!process) {
      throw new Error('process id not found')
    }

    const productionTimeInHours = productionTimeInMinutes / MINUTES_IN_ONE_HOUR

    const cicleTime = (process.cycleTimeInSeconds / process.cavitiesNumber)
    const targetPerHour = Math.round(SECONDS_IN_ONE_HOUR / cicleTime)

    let loss = Math.round(((targetPerHour * productionTimeInHours) - quantityProduced) * (cicleTime / 60))

    if (loss < 0) loss = 0

    return {
      targetPerHour,
      loss
    }
  }
}
