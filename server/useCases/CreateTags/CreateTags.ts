import { type IProductRepository } from '../../repositories/interfaces/IProductRepository'
import { type IPDFProvider } from '../../providers/interfaces/IPDFProvider'
import { type ISSRProvider } from '../../providers/interfaces/ISSRProvider'
import { type CreateTagsRequestDTO } from './CreateTagsDTO'
import { type ITagsPDFContainerComponent, type ITagsPDFContainerComponentProps, type ITagsProps } from '../../interfaces/ITagsPDFContainerComponent'
import { type IIdProvider } from '../../providers/interfaces/IIdProvider'
import { HttpError } from '../../utils/HttpError'

export class CreateTags {
  constructor (
    private readonly productRepository: IProductRepository,
    private readonly pdfProvider: IPDFProvider,
    private readonly ssrProvider: ISSRProvider,
    private readonly tagComponent: ITagsPDFContainerComponent,
    private readonly idProvider: IIdProvider
  ) {}

  async execute (productList: CreateTagsRequestDTO) {
    const products = await this.createTagsData(productList)

    if (products === null) {
      throw new HttpError({ code: 'BAD_REQUEST', message: 'product not found' })
    }

    const html = this.ssrProvider.renderToString<ITagsPDFContainerComponentProps>(
      { tags: products },
      this.tagComponent
    )
    return await this.pdfProvider.createFromHtml(html)
  }

  async createTagsData (productList: CreateTagsRequestDTO) {
    const data: ITagsProps[] = []

    for await (const { amount, id, isFractional } of productList) {
      const product = await this.productRepository.findById(id)
      if (product === null) {
        return null
      }
      for (let i = 1; i <= amount; i++) {
        data.push({ data: product, isFractional, tagId: this.idProvider.generateCUID() })
      }
    }

    return data
  }
}
