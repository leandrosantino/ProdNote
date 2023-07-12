import { type IProductRepository } from '../../repositories/interfaces/IProductRepository'
import { type IPDFProvider } from '../../providers/interfaces/IPDFProvider'
import { type ISSRProvider } from '../../providers/interfaces/ISSRProvider'
import { type CreateTagsRequestDTO } from './CreateTagsDTO'
import { type Product } from '../../entities/Product'
interface CompoonentPorps { data: Product, isFractional: boolean }

export class CreateTags {
  constructor (
    private readonly productRepository: IProductRepository,
    private readonly pdfProvider: IPDFProvider,
    private readonly ssrProvider: ISSRProvider,
    private readonly tagComponent: (porps: { products: CompoonentPorps[] }) => JSX.Element
  ) {}

  async execute (productList: CreateTagsRequestDTO) {
    const products: CompoonentPorps[] = []

    for await (const { amount, id, isFractional } of productList) {
      const product = await this.productRepository.getById(id)
      for (let i = 1; i <= amount; i++) {
        products.push({ data: product, isFractional })
      }
    }

    const html = this.ssrProvider.renderToString<{ products: CompoonentPorps[] }>(
      { products },
      this.tagComponent
    )

    await this.pdfProvider.createFromHtml(html)
  }
}
