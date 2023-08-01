import { type ProductionGroup } from '../entities/ProductionGroup'

export interface IProductionGroupRepository {
  // findById: (id: string) => Promise<ProductionGroup | null>
  // findMany: () => Promise<ProductionGroup[]>
  connect: (data: { machines: string[], products: string[] }, id: string) => Promise<ProductionGroup | null>
}
