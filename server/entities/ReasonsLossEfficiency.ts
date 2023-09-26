export const lossTypesList = [
  'scrap',
  'rework',
  'stoppages',
  'mechanical',
  'electrical',
  'tooling'
] as const

export const classificationTypesList = [
  'Shift Setup',
  'Change-Over + SMED',
  'Breakdowns',
  'Maintenance',
  'Scrap + Quality Issues',
  'Organizational Issues'
] as const

export interface ReasonsLossEfficiency {
  id: string
  type: typeof lossTypesList[number]
  description: string
  classification: typeof classificationTypesList[number]
  // productionEfficiencyLosses: ProductionEfficiencyLoss[]
}
