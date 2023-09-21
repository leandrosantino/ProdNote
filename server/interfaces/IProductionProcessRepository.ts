import { type Machine } from '../entities/Machine'
import { type ProductionProcess } from '../entities/ProductionProcess'

export interface CreateProductionProcessProps {
  data: Omit<ProductionProcess, 'id' | 'machines' | 'product'>
  machines: Array<Machine['id']>
}

export interface IProductionProcessRepository {
  create: (props: CreateProductionProcessProps) => Promise<ProductionProcess>
  update: (id: string, data: CreateProductionProcessProps) => Promise<ProductionProcess | null>
  delete: (id: string) => Promise<void>
  findById: (id: string) => Promise<ProductionProcess | null>
  findManyByFilters: (filters: { ute?: string, description?: string }) => Promise<ProductionProcess[]>
  getProductionProcessMachines: (id: string) => Promise<Machine[] | null>
}
