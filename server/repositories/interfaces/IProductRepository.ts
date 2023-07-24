import { type Product } from '../../entities/Product'

export interface IProductRepository {
  findById: (id: string) => Promise<Product | null>
  findMany: () => Promise<Product[]>
}
