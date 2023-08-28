import { type ReasonsLossEfficiency } from '../entities/ReasonsLossEfficiency'

export interface IReasonsLossEfficiencyRepository {
  create: (data: Omit<ReasonsLossEfficiency, 'id' | 'productionEfficiencyLosses'>) => Promise<ReasonsLossEfficiency>
  findMany: (where?: { type: ReasonsLossEfficiency['type'] }) => Promise<ReasonsLossEfficiency[]>
}
