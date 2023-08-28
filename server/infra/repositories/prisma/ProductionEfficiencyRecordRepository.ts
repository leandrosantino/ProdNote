import { type ProductionEfficiencyLoss } from '../../../entities/ProductionEfficiencyLoss'
import { type ProductionEfficiencyRecord } from '../../../entities/ProductionEfficiencyRecord'
import { type IProductionEfficiencyRecordRepository } from '../../../interfaces/IProductionEfficiencyRecordRepository'
import { prisma } from './connection'

export class ProductionEfficiencyRecordRepository implements IProductionEfficiencyRecordRepository {
  // private readonly include = {

  // }

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
          include: {
            productionProcess: {
              include: {
                product: true
              }
            },
            productionEfficiencyLosses: {
              select: {
                id: true,
                lostTimeInMinutes: true,
                reasonsLossEfficiencyId: true,
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
        })

        return record as ProductionEfficiencyRecord
      }
}
