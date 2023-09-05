import { type ProductionEfficiencyLoss } from '../../../entities/ProductionEfficiencyLoss'
import { type ProductionEfficiencyRecord } from '../../../entities/ProductionEfficiencyRecord'
import { type ProductionEfficiencyRecordRepositoryFilters, type IProductionEfficiencyRecordRepository } from '../../../interfaces/IProductionEfficiencyRecordRepository'
import { prisma } from './connection'

export class ProductionEfficiencyRecordRepository implements IProductionEfficiencyRecordRepository {
  create: (
    data: Omit<
    ProductionEfficiencyRecord,
    'id' | 'productionProcess' | 'createdAt' | 'productionEfficiencyLosses'
    >,
    productionEfficiencyLosses: Array<Omit<ProductionEfficiencyLoss, 'id' | 'reasonsLossEfficiency' | 'machine'>>
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

  async findByFilters ({ finishDate, startsDate, technology, turn }: ProductionEfficiencyRecordRepositoryFilters) {
    const record = await prisma.productionEfficiencyRecord.findMany({
      where: {
        AND: {
          turn,
          date: { gte: startsDate, lte: finishDate },
          productionProcess: { technology }
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

    return record as ProductionEfficiencyRecord[]
  }

  async getTotalOfLostTimeByFilters (where: ProductionEfficiencyRecordRepositoryFilters) {
    const { _sum: { lostTimeInMinutes } } = await prisma.productionEfficiencyLoss.aggregate({
      where: {
        productionEfficiencyRecord: {
          AND: {
            turn: where.turn,
            date: { gte: where.startsDate, lte: where.finishDate }
          }
        }
      },
      _sum: {
        lostTimeInMinutes: true
      }
    })
    return lostTimeInMinutes
  }

  async getTotalOfProductionTimeByFilters ({ finishDate, startsDate, technology, turn }: ProductionEfficiencyRecordRepositoryFilters) {
    const { _sum: { productionTimeInMinutes } } = await prisma.productionEfficiencyRecord.aggregate({
      where: {
        AND: {
          turn,
          date: { gte: startsDate, lte: finishDate },
          productionProcess: { technology }
        }
      },
      _sum: {
        productionTimeInMinutes: true
      }
    })

    return productionTimeInMinutes
  }
}
