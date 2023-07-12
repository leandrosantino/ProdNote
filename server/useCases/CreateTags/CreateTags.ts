import { type IProductRepository } from '../../repositories/interfaces/IProductRepository'
import { type IPDFProvider } from '../../providers/interfaces/IPDFProvider'
import { type ISSRProvider } from '../../providers/interfaces/ISSRProvider'
import { type CreateTagsRequestDTO } from './CreateTagsDTO'
import { type ITagsPDFContainerComponent, type ITagsPDFContainerComponentProps, type ITagsProps } from '../../interfaces/ITagsPDFContainerComponent'

export class CreateTags {
  constructor (
    private readonly productRepository: IProductRepository,
    private readonly pdfProvider: IPDFProvider,
    private readonly ssrProvider: ISSRProvider,
    private readonly tagComponent: ITagsPDFContainerComponent
  ) {}

  async execute (productList: CreateTagsRequestDTO) {
    const products: ITagsProps[] = []

    for await (const { amount, id, isFractional } of productList) {
      const product = await this.productRepository.getById(id)
      if (product !== null) {
        for (let i = 1; i <= amount; i++) {
          products.push({ data: product, isFractional })
        }
      }
    }

    const html = this.ssrProvider.renderToString<ITagsPDFContainerComponentProps>(
      { tags: products },
      this.tagComponent
    )

    return await this.pdfProvider.createFromHtml(html)
  }
}
