import { type Product } from './Product'
import { type Machine } from './Machine'
import { type Planning } from './Planning'
import { type PlanningReport } from './PlanningReport'

export interface ProductionGroup {
  name: string
  products: Product[]
  machines: Machine[]
  plannings: Planning[]
  planningReport: PlanningReport[]
  id?: string
}
