import { type ProductionEfficiencyLoss } from '../../../entities/ProductionEfficiencyLoss'
import { type ProductionEfficiencyRecord } from '../../../entities/ProductionEfficiencyRecord'
import {
  type ProductionEfficiencyRecordRepositoryFilters,
  type IProductionEfficiencyRecordRepository,
  type ProductionEfficiencyRecordIncludedUser
} from '../../../interfaces/IProductionEfficiencyRecordRepository'
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

  async findByFilters ({ finishDate, startsDate, turn, process, ute }: ProductionEfficiencyRecordRepositoryFilters) {
    const record = await prisma.productionEfficiencyRecord.findMany({
      where: {
        turn,
        date: { gte: startsDate?.toISOString(), lte: finishDate?.toISOString() },
        ute,
        productionProcess: {
          description: {
            contains: process
          }
        }
      },
      include: {
        user: true,
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

    return record as ProductionEfficiencyRecordIncludedUser[]
  }

  async getTotalOfLostTimeByFilters (where: ProductionEfficiencyRecordRepositoryFilters) {
    const { _sum: { lostTimeInMinutes } } = await prisma.productionEfficiencyLoss.aggregate({
      where: {
        reasonsLossEfficiency: {
          classification: where.classification
        },
        productionEfficiencyRecord: {
          AND: {
            date: { gte: where.startsDate?.toISOString(), lte: where.finishDate?.toISOString() },
            productionProcess: {
              id: where.process
            },
            turn: where.turn,
            ute: where.ute
          }
        }
      },
      _sum: {
        lostTimeInMinutes: true
      }
    })

    return lostTimeInMinutes
  }

  async getTotalOfProductionTimeByFilters ({ finishDate, startsDate, technology, turn, ...where }: ProductionEfficiencyRecordRepositoryFilters) {
    const { _sum: { productionTimeInMinutes } } = await prisma.productionEfficiencyRecord.aggregate({
      where: {
        AND: {
          turn,
          date: { gte: startsDate?.toISOString(), lte: finishDate?.toISOString() },
          productionProcess: {
            technology,
            id: where.process
          },
          ute: where.ute
        }
      },
      _sum: {
        productionTimeInMinutes: true
      }
    })

    return productionTimeInMinutes
  }

  async getSumOfProductionTimeAndUsefulTimeGroupedByDate (where: ProductionEfficiencyRecordRepositoryFilters) {
    const values = await prisma.productionEfficiencyRecord.groupBy({
      where: {
        AND: {
          turn: where.turn,
          date: { gte: where.startsDate, lte: where.finishDate },
          productionProcess: {
            technology: where.technology,
            id: where.process
          },
          ute: where.ute
        }
      },
      by: ['date'],
      _sum: {
        productionTimeInMinutes: true,
        usefulTimeInMunites: true
      }
    })

    return values.map(({ _sum, date }) => ({
      date,
      productionTimeInMinutes: _sum.productionTimeInMinutes as number,
      usefulTimeInMunites: _sum.usefulTimeInMunites as number
    }))
  }

  async getSumOfProductionTimeAndUsefulTimeByFilters (where: ProductionEfficiencyRecordRepositoryFilters) {
    const { _sum } = await prisma.productionEfficiencyRecord.aggregate({
      where: {
        AND: {
          turn: where.turn,
          date: { gte: where.startsDate, lte: where.finishDate },
          productionProcess: {
            technology: where.technology,
            id: where.process
          },
          ute: where.ute
        }
      },
      _sum: {
        productionTimeInMinutes: true,
        usefulTimeInMunites: true
      }
    })
    return {
      productionTimeInMinutes: _sum.productionTimeInMinutes as number,
      usefulTimeInMunites: _sum.usefulTimeInMunites as number
    }
  }
}
