import { type ProductionEfficiencyLoss } from '../entities/ProductionEfficiencyLoss'
import { type ProductionEfficiencyRecord } from '../entities/ProductionEfficiencyRecord'
import { type ProductionProcess } from '../entities/ProductionProcess'
import { type ReasonsLossEfficiency } from '../entities/ReasonsLossEfficiency'

export interface ProductionEfficiencyRecordRepositoryFilters {
  startsDate?: Date
  finishDate?: Date
  turn?: string
  technology?: ProductionProcess['technology']
  classification?: ReasonsLossEfficiency['classification']
}

export interface IProductionEfficiencyRecordRepository {
  create: (
    data: Omit<
    ProductionEfficiencyRecord,
    'id' | 'productionProcess' | 'createdAt' | 'productionEfficiencyLosses'
    >,
    productionEfficiencyLosses: Array<Omit<
    ProductionEfficiencyLoss, 'id' | 'reasonsLossEfficiency' | 'machine'
    >>
  ) => Promise<ProductionEfficiencyRecord>
  findByFilters: (
    where: ProductionEfficiencyRecordRepositoryFilters
  ) => Promise<ProductionEfficiencyRecord[]>

  getTotalOfLostTimeByFilters: (where: ProductionEfficiencyRecordRepositoryFilters) => Promise<number | null>
  getTotalOfProductionTimeByFilters: (where: ProductionEfficiencyRecordRepositoryFilters) => Promise<number | null>
  getSumOfProductionTimeAndUsefulTimeGroupedByDate: (where: ProductionEfficiencyRecordRepositoryFilters) => Promise<Array<{
    date: Date
    productionTimeInMinutes: number
    usefulTimeInMunites: number
  }>>
}
