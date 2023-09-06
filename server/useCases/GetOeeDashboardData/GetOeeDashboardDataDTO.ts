import { type ProductionEfficiencyRecordRepositoryFilters } from '../../interfaces/IProductionEfficiencyRecordRepository'

export interface GetOeeDashboardDataRequestDTO {
  technology?: ProductionEfficiencyRecordRepositoryFilters['technology']
  turn?: ProductionEfficiencyRecordRepositoryFilters['turn']
  classification?: ProductionEfficiencyRecordRepositoryFilters['classification']
  date: {
    day?: number
    mouth: number
    year: number
  }
}
