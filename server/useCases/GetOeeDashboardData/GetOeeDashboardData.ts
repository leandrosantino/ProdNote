import { type IProductionEfficiencyRecordRepository } from '../../interfaces/IProductionEfficiencyRecordRepository'

export class GetOeeDashboardData {
  constructor (
    private readonly productionEfficiencyRecordRepository: IProductionEfficiencyRecordRepository
  ) {}

  async getTurnChartDate () {
    const data = [
      { turn: '1', value: '0' },
      { turn: '2', value: '0' },
      { turn: '3', value: '0' }
    ]
    const totalOfProductionTime = await this.productionEfficiencyRecordRepository.getTotalOfProductionTimeByFilters({})

    if (totalOfProductionTime) {
      for (const item of data) {
        const totalOfLostTime = await this.productionEfficiencyRecordRepository.getTotalOfLostTimeByFilters({
          turn: item.turn
        })
        if (totalOfLostTime) item.value = ((totalOfLostTime / totalOfProductionTime) * 100).toFixed(1)
      }
    }
    console.table(data)
  }
}
