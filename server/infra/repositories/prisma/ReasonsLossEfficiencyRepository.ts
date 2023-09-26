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

  async update (data: Omit<ReasonsLossEfficiency, 'id' | 'productionEfficiencyLosses'>, id: string) {
    const reasonsLossEfficiency = await prisma.reasonsLossEfficiency.update({
      data,
      where: { id }
    })
    return reasonsLossEfficiency as ReasonsLossEfficiency
  }

  async delete (id: string) {
    await prisma.reasonsLossEfficiency.delete({
      where: { id }
    })
  }

  async findMany ({ description, ...where }: { type?: ReasonsLossEfficiency['type'], description?: string }) {
    const reasonsLossEfficiency = await prisma.reasonsLossEfficiency.findMany({
      where: {
        ...where,
        description: {
          contains: description
        }
      }
    })
    return reasonsLossEfficiency as ReasonsLossEfficiency[]
  }
}
