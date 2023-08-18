import { type ProductionRecord } from '../../entities/ProductionRecord'

export interface ProductionRecordRequestDTO extends Omit<ProductionRecord, 'product' | 'user'> {}
