import { type IProductionEfficiencyRecordRepository } from '../../interfaces/IProductionEfficiencyRecordRepository'
import { type ListProductionEfficiencyRequestDTO } from './ListProductionEfficiencyDTO'

export class ListProductionEfficiency {
  constructor (
    private readonly productionEfficiencyRecordRepository: IProductionEfficiencyRecordRepository
  ) {}

  async execute ({ filters }: ListProductionEfficiencyRequestDTO) {
    let dateFilters: { startsDate?: Date, finishDate?: Date } = {}
    if (filters.date) {
      dateFilters = this.getStartsAndfinishDateByDateObject(filters.date)
    }

    const records = await this.productionEfficiencyRecordRepository.findByFilters({
      startsDate: dateFilters.startsDate,
      finishDate: dateFilters.finishDate,
      turn: filters.turn,
      process: filters.process,
      ute: filters.ute
    })

    return records
  }

  private getStartsAndfinishDateByDateObject (date: Date) {
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    return {
      startsDate: new Date(year, month, day, 0, 0, 0),
      finishDate: new Date(year, month, day, 23, 59, 59)
    }
  }
}
