import { type ProductionProcess } from '../../../entities/ProductionProcess'
import { type IProductionProcessRepository } from '../../../interfaces/IProductionProcessRepository'
import { prisma } from './connection'

export class ProductionProcessRepository implements IProductionProcessRepository {
  async create (data: Omit<ProductionProcess, 'id' | 'machines' | 'products'>) {
    const process = await prisma.productionProcess.create({ data })
    return process as ProductionProcess
  }
}
