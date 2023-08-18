import { type ProductionRecord } from '../entities/ProductionRecord'

export interface IProductionRecordRepository {
  findById: (id: string) => Promise<ProductionRecord | null>
  // findMany: () => Promise<ProductionReport[]>
  create: (data: Omit<ProductionRecord, 'product' | 'user'>) => Promise<ProductionRecord>
}
