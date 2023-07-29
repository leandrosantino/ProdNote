import { Repositories } from '../../infra/repositories'
import { PDFProvider } from '../../providers/implementations/PDFProvider'
import { SSRProvider } from '../../providers/implementations/SSRProvider'
import { CreateTags } from './CreateTags'
import { TagsPDFContainer } from '../../../src/serverComponents/TagsPDFContainer'
import { IdProvider } from '../../providers/implementations/IdProvider'

const productRepository = new Repositories.Product()
const pdfProvider = new PDFProvider()
const ssrProvider = new SSRProvider()
const idProvider = new IdProvider()

export const createTags = new CreateTags(
  productRepository,
  pdfProvider,
  ssrProvider,
  TagsPDFContainer,
  idProvider
)
