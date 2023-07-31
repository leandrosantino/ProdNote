// import axios from 'axios'
import { Repositories } from './repositories'
import { logger } from '../utils/logger'
import { type Machine } from '../entities/Machine'

// interface Product {
//   id: string
//   description: string
//   technicalDescription: string
//   ute: string
//   classification: string
//   partNumber: string
//   sapCode: string
//   projectNumber: string
//   amount: number
// }

// const productRepository = new Repositories.Product();
const machineRepository = new Repositories.Machine();

// (async () => {
//   try {
//     const { data: products } = await axios.get<Product[]>('http://192.168.115.201:3333/api/products', {})
//     for await (const product of products) {
//       logger.info('   - add ' + product.description)
//       await productRepository.create(product)
//     }
//   } catch (err) {
//     logger.error(err)
//   }
// })()
//   .catch(logger.error)

(async () => {
  try {
    const machines: Machine[] = [
      {
        capacity: 27,
        id: '1',
        slug: 'M15',
        ute: 'UTE-3'
      },
      {
        capacity: 15,
        id: '2',
        slug: 'M16',
        ute: 'UTE-3'
      }
    ]

    for await (const machine of machines) {
      logger.info('   - add ' + machine.slug)
      await machineRepository.create(machine)
    }
  } catch (err) {
    logger.error(err)
  }
})()
  .catch(logger.error)
