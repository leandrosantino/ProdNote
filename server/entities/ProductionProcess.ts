import { type Product } from './Product'
import { type Machine } from '../entities/Machine'
import { type uteKeysList } from './ProductionEfficiencyRecord'

export const technologyTypesList = [
  'Hydraulic Press',
  'Hot Pressing',
  'Carpet Monding',
  'Assemble'
] as const

export interface ProductionProcess {
  id?: string
  description: string
  cycleTimeInSeconds: number
  projectNumber: string
  technology: typeof technologyTypesList[number]
  ute: typeof uteKeysList[number]
  productId: string
  product: Product
  machines?: Machine[]
}
