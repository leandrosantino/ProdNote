import { type Product } from '../../entities/Product'

export interface IProductRepository {
  getById: (id: string) => Promise<Product | null>
  findMany: () => Promise<Product[]>
}
