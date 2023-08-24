import { type ReasonsLossEfficiency } from './ReasonsLossEfficiency'

export interface ProductionEfficiencyLoss {
  id: string
  lostTimeInMinutes: number
  reasonsLossEfficiencyId: ReasonsLossEfficiency['id']
  reasonsLossEfficiency: ReasonsLossEfficiency
}
