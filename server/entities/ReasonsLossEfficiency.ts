export const lossTypesList = [
  'scrap',
  'rework',
  'stoppages'
] as const

export interface ReasonsLossEfficiency {
  id: string
  type: typeof lossTypesList[number]
  description: string
  // productionEfficiencyLosses: ProductionEfficiencyLoss[]
}
