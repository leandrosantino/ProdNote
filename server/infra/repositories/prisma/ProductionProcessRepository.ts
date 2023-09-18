import { type Machine } from '../../../entities/Machine'
import { type ProductionProcess } from '../../../entities/ProductionProcess'
import { type CreateProductionProcessProps, type IProductionProcessRepository } from '../../../interfaces/IProductionProcessRepository'
import { prisma } from './connection'

export class ProductionProcessRepository implements IProductionProcessRepository {
  async create ({ data, machines }: CreateProductionProcessProps) {
    const process = await prisma.productionProcess.create({
      data: {
        ...data,
        machines: {
          connect: machines.map(id => ({ id }))
        }
      }
    })
    return process as ProductionProcess
  }

  async findById (id: string) {
    const process = await prisma.productionProcess.findUnique({
      where: { id }
    })
    if (process) {
      return process as ProductionProcess
    }
    return null
  }

  async findManyByFilters (filters: { ute?: string }) {
    const process = await prisma.productionProcess.findMany({
      where: {
        ...filters
      }
    })
    return process as ProductionProcess[]
  }

  async getProductionProcessMachines (id: string) {
    const process = await prisma.productionProcess.findUnique({
      where: { id },
      include: {
        machines: true
      }
    })

    if (process) {
      return process.machines as Machine[]
    }
    return null
  }
}
