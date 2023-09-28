import { type Product } from './Product'
import { type Machine } from '../entities/Machine'
import { type UteKeys } from './ProductionEfficiencyRecord'

export const technologyTypesList = [
  'Hydraulic Press',
  'Hot Pressing',
  'Carpet Monding',
  'Assemble',
  'Carpet Welding',
  'PUR Foam Molding',
  'LWF Block Foaming',
  'Lamination',
  'Water Jet',
  'Glue application',
  'Glasutec'
] as const

export type TechnologyKeys = typeof technologyTypesList[number]

export interface ProductionProcess {
  id?: string
  description: string
  cycleTimeInSeconds: number
  projectNumber: string
  technology: TechnologyKeys
  ute: UteKeys
  productId: string
  product: Product
  machines?: Machine[]
  cavitiesNumber: number
}
