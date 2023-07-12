import { type IProductRepository } from '../../interfaces/IProductRepository'
import { type Product } from '../../../entities/Product'

const products: Product[] = [
  {
    amount: 1,
    classification: 'acabado',
    description: 'Carpete moldado esquedo',
    partNumber: '6187481',
    projectNumber: '592',
    sapCode: '112847718.01',
    technicalDescription: 'carpete font fender esquedo',
    ute: 'ute-5',
    id: 'iahwrguiabwepiuaewfiaue'
  },
  {
    amount: 2,
    classification: 'acabado',
    description: 'Carpete moldado esquedo',
    partNumber: '6187481',
    projectNumber: '592',
    sapCode: '112847718.01',
    technicalDescription: 'carpete font fender esquedo',
    ute: 'ute-5',
    id: 'igsdivubasodivbasddbr'
  }
]

export class ProductRepository implements IProductRepository {
  async getById (id: string) {
    return {} as Product
  }

  async findMany () {
    return products
  }
}
