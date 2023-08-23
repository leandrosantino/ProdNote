import { type ProductionProcess } from './ProductionProcess'

export const uteKeysList = ['UTE-1', 'UTE-2', 'UTE-3', 'UTE-4', 'UTE-5'] as const

export interface ProductionEfficiencyRecord {
  id: string
  createdAt: Date
  date: Date
  turn: string
  ute: typeof uteKeysList[number]
  productionTimeInMinutes: number
  piecesQuantity: number
  oeeValue: number
  productionProcessId: ProductionProcess['id']
  productionProcess: ProductionProcess
}
