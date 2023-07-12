import { ProductRepository } from '../../repositories/implementations/prisma/ProductRepository'
import { PDFProvider } from '../../providers/implementations/PDFProvider'
import { SSRProvider } from '../../providers/implementations/SSRProvider'
import { CreateTags } from './CreateTags'
import { TagsPDFContainer } from '../../../src/serverComponents/TagsPDFContainer'

const productRepository = new ProductRepository()
const pdfProvider = new PDFProvider()
const ssrProvider = new SSRProvider()

export const createTags = new CreateTags(
  productRepository,
  pdfProvider,
  ssrProvider,
  TagsPDFContainer
)
