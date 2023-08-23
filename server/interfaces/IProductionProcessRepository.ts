import { type ProductionProcess } from '../entities/ProductionProcess'

export interface IProductionProcessRepository {
  create: (data: Omit<ProductionProcess, 'id' | 'machines'>) => Promise<ProductionProcess>
}
