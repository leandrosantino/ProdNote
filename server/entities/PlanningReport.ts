export interface PlanningReport {
  index: string
  weeklyDemand: number
  dailyDemand: number
  initialStock: number
  currentStock: number
  coverage: number
  minLot: number
  productionGroupId?: string
  planningId?: string
  id?: string
}
