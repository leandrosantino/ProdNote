import { type Product } from '../../entities/Product'

export interface IProductRepository {
  getById: (id: string) => Promise<Product>
  findMany: () => Promise<Product[]>
}
