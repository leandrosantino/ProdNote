export class PlanningReport {
  constructor (
    public index: string,
    public weeklyDemand: number,
    public dailyDemand: number,
    public initialStock: number,
    public currentStock: number,
    public coverage: number,
    public minLot: number,
    public productionGroupId?: string,
    public planningId?: string,
    public id?: string
  ) {}
}
