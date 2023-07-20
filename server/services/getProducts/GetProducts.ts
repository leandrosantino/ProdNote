import { type IProductRepository } from '../../repositories/interfaces/IProductRepository'

export class GetProducts {
  constructor (
    private readonly productsRepository: IProductRepository
  ) {}

  async execute () {
    return await this.productsRepository.findMany()
  }
}
