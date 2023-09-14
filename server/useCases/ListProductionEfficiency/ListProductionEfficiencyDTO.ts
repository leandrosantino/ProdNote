export interface ListProductionEfficiencyRequestDTO {
  filters: {
    process?: string
    ute?: string
    turn?: string
    date?: Date
  }
}
