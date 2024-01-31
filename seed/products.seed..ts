import axios from 'axios'
import { logger } from '../server/utils/logger'
import { Repositories } from '../server/infra/repositories'

interface Product {
  id: string
  description: string
  technicalDescription: string
  ute: string
  classification: string
  partNumber: string
  sapCode: string
  projectNumber: string
  amount: number
}

export async function productSeed () {
  const productRepository = new Repositories.Product()

  logger.success('Seeding Products Table')

  const genericProduct: Product = {
    id: 'cln20ivzw0000m5m0j8dgukmw',
    description: 'generic',
    amount: 0,
    classification: '',
    partNumber: '',
    projectNumber: '',
    sapCode: 'generic',
    technicalDescription: '',
    ute: 'UTE-3'
  }

  try {
    const { data: products } = await axios.get<Product[]>('http://localhost:3336/api/products', {})
    for await (const product of [genericProduct, ...products]) {
      logger.info('   - add ' + product.description)
      await productRepository.create(product)
    }
  } catch (err) {
    logger.error((err as Error).message)
  }
}
