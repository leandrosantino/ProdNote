import { type IProductRepository } from '../../../interfaces/IProductRepository'
import { type Product } from '../../../entities/Product'
import { prisma } from './connection'

export class ProductRepository implements IProductRepository {
  async findById (id: string) {
    const resp = await prisma.product.findUnique({
      where: { id }
    })
    if (resp) {
      return resp as Product
    }
    return null
  }

  async findMany () {
    return await prisma.product.findMany() as Product[]
  }

  async create (data: Omit<Product, 'machines'>) {
    const product = await prisma.product.create({ data })
    return product as Product
  }
}
