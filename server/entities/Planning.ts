import { type PlanningReport } from './PlanningReport'
import { type ProductionGroup } from './ProductionGroup'

export interface Planning {
  startsAt: Date
  endsAt: Date
  lowRunner: number
  HighRunner: number
  productionGroups?: ProductionGroup[]
  planningReports?: PlanningReport[]
  id?: string
}
