import { CreateTags } from './CreateTags'
import { type IProductRepository } from '../../interfaces/IProductRepository'
import { type IPDFProvider } from '../../providers/interfaces/IPDFProvider'
import { type ISSRProvider } from '../../providers/interfaces/ISSRProvider'
import { type ITagsProps, type ITagsPDFContainerComponent } from '../../interfaces/ITagsPDFContainerComponent'
import { type IIdProvider } from '../../providers/interfaces/IIdProvider'
import { type CreateTagsRequestDTO } from './CreateTagsDTO'

describe('tests create tags', () => {
  const product = {
    amount: 1,
    classification: '',
    description: '',
    partNumber: '',
    projectNumber: '',
    sapCode: '',
    technicalDescription: '',
    ute: '',
    id: '1'
  }

  const productRepository = {
    async findById (id) {
      if (id === '1') {
        return product
      }
      return null
    }
  } as IProductRepository

  const pdfProvider = {
    async createFromHtml () {
      return Buffer.from('')
    }
  } as IPDFProvider

  const ssrProvider = {
    renderToString () {
      return ''
    }
  } as ISSRProvider

  const idProvider = {
    generateCUID () {
      return '1234'
    }
  } as IIdProvider

  const tagsPDFContainerComponent = {} as ITagsPDFContainerComponent

  const createTags = new CreateTags(
    productRepository,
    pdfProvider,
    ssrProvider,
    tagsPDFContainerComponent,
    idProvider
  )

  test('should return buffer', async () => {
    await expect(createTags.execute([
      {
        amount: 1,
        id: '1',
        isFractional: false
      }
    ] as CreateTagsRequestDTO[])).resolves.toBeInstanceOf(Buffer)
  })

  test('should exception throw if product not found', async () => {
    await expect(createTags.execute([
      {
        amount: 1,
        id: '2',
        isFractional: false
      }
    ] as CreateTagsRequestDTO[])).rejects.toEqual(new Error('product not found'))
  })

  test('should return a tag data list', async () => {
    await expect(createTags.createTagsData([
      {
        amount: 1,
        id: '1',
        isFractional: false
      }
    ] as CreateTagsRequestDTO[])).resolves.toEqual([{
      data: product,
      isFractional: false,
      tagId: '1234'
    }] as ITagsProps[])
  })
})
