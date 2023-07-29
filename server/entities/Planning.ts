import { type PlanningReport } from './PlanningReport'
import { type ProductionGroup } from './ProductionGroup'

export class Planning {
  constructor (
    public startsAt: Date,
    public endsAt: Date,
    public lowRunner: number,
    public HighRunner: number,
    public productionGroups?: ProductionGroup[],
    public planningReports?: PlanningReport[],
    public id?: string
  ) {}
}
