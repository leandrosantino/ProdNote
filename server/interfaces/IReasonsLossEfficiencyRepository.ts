import { type ReasonsLossEfficiency } from '../entities/ReasonsLossEfficiency'

export interface IReasonsLossEfficiencyRepository {
  create: (data: Omit<ReasonsLossEfficiency, 'id' | 'productionEfficiencyLosses'>) => Promise<ReasonsLossEfficiency>
  update: (data: Omit<ReasonsLossEfficiency, 'id' | 'productionEfficiencyLosses'>, id: string) => Promise<ReasonsLossEfficiency>
  delete: (id: string) => Promise<void>
  findMany: (where: { type?: ReasonsLossEfficiency['type'], description?: string }) => Promise<ReasonsLossEfficiency[]>
}
