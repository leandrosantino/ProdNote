import { GetProducts } from './GetProducts'
import { ProductRepository } from '../../repositories/implementations/prisma/ProductRepository'

export const getProducts = new GetProducts(
  new ProductRepository()
)
