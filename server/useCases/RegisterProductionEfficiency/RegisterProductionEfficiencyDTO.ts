import { type ProductionEfficiencyLoss } from '../../entities/ProductionEfficiencyLoss'
import { type ProductionEfficiencyRecord } from '../../entities/ProductionEfficiencyRecord'

export interface RegisterProductionEfficiencyRequestDTO {
  data: Omit<
  ProductionEfficiencyRecord,
  'id' | 'productionProcess' | 'createdAt' | 'productionEfficiencyLosses' | 'oeeValue'
  >
  productionEfficiencyLosses: Array<Omit<ProductionEfficiencyLoss, 'id' | 'reasonsLossEfficiency' | 'machine'>>
}
