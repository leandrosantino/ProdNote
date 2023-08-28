import { type Machine } from '@prisma/client'
import { type ReasonsLossEfficiency } from './ReasonsLossEfficiency'

export interface ProductionEfficiencyLoss {
  id: string
  lostTimeInMinutes: number
  machineId: Machine['id']
  reasonsLossEfficiencyId: ReasonsLossEfficiency['id']

  machine: Machine
  reasonsLossEfficiency: ReasonsLossEfficiency
}
