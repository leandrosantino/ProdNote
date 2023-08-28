import { type Machine } from '../entities/Machine'
import { type ProductionProcess } from '../entities/ProductionProcess'

export interface CreateProductionProcessProps {
  data: Omit<ProductionProcess, 'id' | 'machines' | 'product'>
  machines: Array<Machine['id']>
}

export interface IProductionProcessRepository {
  create: (props: CreateProductionProcessProps) => Promise<ProductionProcess>
  findById: (id: string) => Promise<ProductionProcess | null>
}
