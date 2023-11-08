import { type ProductionProcess } from '@prisma/client'
import { type ProductionProcessRepository } from '../../infra/repositories/prisma/ProductionProcessRepository'

const SECONDS_IN_ONE_HOUR = 3600

export class CalculateLoss {
  constructor (
    private readonly productionProcessRepository: ProductionProcessRepository
  ) {}

  async execute (processId: ProductionProcess['id'], quantityProduced: number) {
    const process = await this.productionProcessRepository.findById(processId)

    if (!process) {
      throw new Error('process id not found')
    }

    const targetPerHour = Math.round(SECONDS_IN_ONE_HOUR / process.cycleTimeInSeconds * process.cavitiesNumber)

    let loss = Math.round(((targetPerHour - quantityProduced) * process.cycleTimeInSeconds) / 60)

    if (loss < 0) loss = 0

    return {
      targetPerHour,
      loss
    }
  }
}
