import { type ProductionEfficiencyLoss } from '../entities/ProductionEfficiencyLoss'
import { type ProductionEfficiencyRecord } from '../entities/ProductionEfficiencyRecord'

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
}
