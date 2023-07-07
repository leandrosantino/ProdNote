import { type IProductRepository } from '../../interfaces/IProductRepository'
import { type Product } from '../../../entities/Product'

export class ProductRepository implements IProductRepository {
  getById (id: string) {
    return {} as Product
  }
}
