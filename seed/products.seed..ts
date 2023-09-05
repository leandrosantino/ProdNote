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
  try {
    const { data: products } = await axios.get<Product[]>('http://192.168.115.201:3333/api/products', {})
    for await (const product of products) {
      logger.info('   - add ' + product.description)
      await productRepository.create(product)
    }
  } catch (err) {
    logger.error(err)
  }
}
