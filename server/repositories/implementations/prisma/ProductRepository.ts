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
    id: '1'
  },
  {
    amount: 2,
    classification: 'acabado',
    description: 'Bloco Hood 552',
    partNumber: '6187481',
    projectNumber: '592',
    sapCode: '112847718.01',
    technicalDescription: 'carpete font fender esquedo',
    ute: 'ute-5',
    id: '2'
  }
]

export class ProductRepository implements IProductRepository {
  async getById (id: string) {
    const resp = products.filter(entry => entry.id === id)
    if (resp.length === 1) {
      return resp[0]
    }
    return null
  }

  async findMany () {
    return products
  }
}
