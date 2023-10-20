import { type ProductionEfficiencyRecordRepositoryFilters } from '../../interfaces/IProductionEfficiencyRecordRepository'

export interface GetOeeDashboardDataRequestDTO {
  technology?: ProductionEfficiencyRecordRepositoryFilters['technology']
  turn?: ProductionEfficiencyRecordRepositoryFilters['turn']
  classification?: ProductionEfficiencyRecordRepositoryFilters['classification']
  process?: string
  machineSlug?: string
  ute?: string
  date: {
    day?: number
    mouth: number
    year: number
  }
}
