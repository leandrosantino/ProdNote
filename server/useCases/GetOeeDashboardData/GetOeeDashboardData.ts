import { type IProductionEfficiencyRecordRepository } from '../../interfaces/IProductionEfficiencyRecordRepository'
import { type GetOeeDashboardDataRequestDTO } from './GetOeeDashboardDataDTO'

export class GetOeeDashboardData {
  constructor (
    private readonly productionEfficiencyRecordRepository: IProductionEfficiencyRecordRepository
  ) {}

  async getTurnChartDate (filters: GetOeeDashboardDataRequestDTO) {
    const data = [
      { turn: '1', value: 0 },
      { turn: '2', value: 0 },
      { turn: '3', value: 0 }
    ]

    const dateFilters = this.getStartsAndfinishDateByFilters(filters.date)

    const totalOfProductionTime = await this.productionEfficiencyRecordRepository.getTotalOfLostTimeByFilters({
      ...dateFilters
    })

    if (totalOfProductionTime) {
      for (const item of data) {
        const totalOfLostTime = await this.productionEfficiencyRecordRepository.getTotalOfLostTimeByFilters({
          ...dateFilters,
          turn: item.turn
        })
        if (totalOfLostTime) {
          item.value = Number(
            ((totalOfLostTime / totalOfProductionTime) * 100).toFixed(1)
          )
        }
      }
    }

    console.table(data)

    return data
  }

  async getClassChartData (filters: GetOeeDashboardDataRequestDTO) {
    const data: Array<{
      classification: GetOeeDashboardDataRequestDTO['classification']
      value: number
    }> = [
      { classification: 'Breakdowns', value: 0 },
      { classification: 'Change-Over + SMED', value: 0 },
      { classification: 'Maintenance', value: 0 },
      { classification: 'Organizational Issues', value: 0 },
      { classification: 'Scrap + Quality Issues', value: 0 },
      { classification: 'Shift Setup', value: 0 }
    ]

    const dateFilters = this.getStartsAndfinishDateByFilters(filters.date)

    const totalOfProductionTime = await this.productionEfficiencyRecordRepository.getTotalOfProductionTimeByFilters({
      ...dateFilters,
      turn: filters.turn,
      technology: filters.technology
    })

    if (totalOfProductionTime) {
      for (const item of data) {
        const totalOfLostTime = await this.productionEfficiencyRecordRepository.getTotalOfLostTimeByFilters({
          ...dateFilters,
          classification: item.classification,
          turn: filters.turn,
          technology: filters.technology
        })
        if (totalOfLostTime) {
          item.value = Number(((totalOfLostTime / totalOfProductionTime) * 100).toFixed(1))
        }
      }
    }

    console.table(data)

    return data
  }

  async getDailyChartData ({ date, classification, ...rest }: GetOeeDashboardDataRequestDTO) {
    const dateFilters = this.getStartsAndfinishDateByFilters(date)
    const values = await this.productionEfficiencyRecordRepository.getSumOfProductionTimeAndUsefulTimeGroupedByDate({
      ...dateFilters,
      ...rest
    })
    const chatData = values.map(({ date, productionTimeInMinutes, usefulTimeInMunites }) => ({
      date,
      oeeValue: Number((usefulTimeInMunites / productionTimeInMinutes * 100).toFixed(1))
    }))
    console.table(chatData)
    return chatData
  }

  async getGeneralOeeValue ({ date, classification, ...rest }: GetOeeDashboardDataRequestDTO) {
    const dateFilters = this.getStartsAndfinishDateByFilters(date)
    const { productionTimeInMinutes, usefulTimeInMunites } = await this.productionEfficiencyRecordRepository.getSumOfProductionTimeAndUsefulTimeByFilters({
      ...dateFilters,
      ...rest
    })
    const chatData = {
      oeeValue: Number((usefulTimeInMunites / productionTimeInMinutes * 100).toFixed(1))
    }
    console.table(chatData)
    return chatData
  }

  private getStartsAndfinishDateByFilters ({ day, mouth, year }: GetOeeDashboardDataRequestDTO['date']) {
    const mouthIndex = mouth - 1
    let initialDay = 1
    let finishDay = new Date(year, mouthIndex + 1, 0).getDate()

    if (day) {
      initialDay = day
      finishDay = day
    }

    return {
      startsDate: new Date(year, mouthIndex, initialDay, 0, 0, 0),
      finishDate: new Date(year, mouthIndex, finishDay, 23, 59, 59)
    }
  }
}
