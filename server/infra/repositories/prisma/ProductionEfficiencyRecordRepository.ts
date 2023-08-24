import { type ProductionEfficiencyLoss } from '../../../entities/ProductionEfficiencyLoss'
import { type ProductionEfficiencyRecord } from '../../../entities/ProductionEfficiencyRecord'
import { type IProductionEfficiencyRecordRepository } from '../../../interfaces/IProductionEfficiencyRecordRepository'
import { prisma } from './connection'

export class ProductionEfficiencyRecordRepository implements IProductionEfficiencyRecordRepository {
  private readonly include = {
    productionProcess: true,
    productionEfficiencyLosses: {
      select: {
        id: true,
        lostTimeInMinutes: true,
        reasonsLossEfficiencyId: true,
        reasonsLossEfficiency: true
      },
      include: {
        reasonsLossEfficiency: {
          select: {
            id: true,
            description: true,
            type: true
          }
        }
      }
    }
  }

  create: (
    data: Omit<
    ProductionEfficiencyRecord,
    'id' | 'productionProcess' | 'createdAt' | 'productionEfficiencyLosses'
    >,
    productionEfficiencyLosses: Array<Omit<ProductionEfficiencyLoss, 'id' | 'reasonsLossEfficiency'>>
  ) => Promise<ProductionEfficiencyRecord> =
      async (data, productionEfficiencyLosses) => {
        const record = await prisma.productionEfficiencyRecord.create({
          data: {
            ...data,
            productionEfficiencyLosses: {
              create: productionEfficiencyLosses
            }
          },
          include: this.include
        })

        return record as ProductionEfficiencyRecord
      }
}
