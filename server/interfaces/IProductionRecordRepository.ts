import { type ProductionRecord } from '../entities/ProductionRecord'

export interface IProductionRecordRepository {
  findById: (id: ProductionRecord['id']) => Promise<ProductionRecord | null>
  // findMany: () => Promise<ProductionReport[]>
  create: (data: Omit<ProductionRecord, 'product' | 'user' | 'date'>) => Promise<ProductionRecord>
  delete: (id: ProductionRecord['id']) => Promise<void>
}
