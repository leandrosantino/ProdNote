import { type ReasonsLossEfficiency } from '../../../entities/ReasonsLossEfficiency'
import { type IReasonsLossEfficiencyRepository } from '../../../interfaces/IReasonsLossEfficiencyRepository'
import { prisma } from './connection'

export class ReasonsLossEfficiencyRepository implements IReasonsLossEfficiencyRepository {
  async create (data: Omit<ReasonsLossEfficiency, 'id' | 'productionEfficiencyLosses'>) {
    const reasonsLossEfficiency = await prisma.reasonsLossEfficiency.create({
      data
    })
    return reasonsLossEfficiency as ReasonsLossEfficiency
  }
}
