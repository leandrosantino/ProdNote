import { type ProductionGroup } from '../../../entities/ProductionGroup'
import { type IProductionGroupRepository } from '../../../interfaces/IProductionGroupRepository'
import { prisma } from './connection'

export class ProductionGroupRepository implements IProductionGroupRepository {
  async connect ({ machines, products }: { machines: string[], products: string[] }, id: string) {
    const productionGroup = await prisma.productionGroup.update({
      where: {
        id
      },
      data: {
        machines: {
          connect: machines.map(entry => ({ id: entry }))
        },
        products: {
          connect: products.map(entry => ({ id: entry }))
        }
      }
    })
    return productionGroup as ProductionGroup
  }
}
