import { type ProductionEfficiencyRecord } from './ProductionEfficiencyRecord'
import { type ReasonsLossEfficiency } from './ReasonsLossEfficiency'

export interface ProductionEfficiencyLoss {
  id: string
  lostTimeInMinutes: number
  productionEfficiencyRecordId: ProductionEfficiencyRecord['id']
  productionEfficiencyRecord?: ProductionEfficiencyRecord
  reasonsLossEfficiencyId: ReasonsLossEfficiency['id']
  reasonsLossEfficiency: ReasonsLossEfficiency
}
