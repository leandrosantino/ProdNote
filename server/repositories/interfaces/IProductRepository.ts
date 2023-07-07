import { type Product } from '../../entities/Product'

export interface IProductRepository {
  getById: (id: string) => Product
}
