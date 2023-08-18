import { type ProductionRecord } from '../../../entities/ProductionRecord'
import { type IProductionRecordRepository } from '../../../interfaces/IProductionRecordRepository'

export class ProductionRecordRepository implements IProductionRecordRepository {
  async create (_: Omit<ProductionRecord, 'product' | 'user'>) {
    return {} as ProductionRecord
  }

  async findById (id: string) {
    if (id !== '') {
      return {} as ProductionRecord
    }
    return null
  }
}
