import { Repositories } from '../../infra/repositories'
import { DeleteProductionRecord } from './DeleteProductionRecord'
import { PassProvider } from '../../providers/implementations/PassProvider'

export const deleteProductionRecord = new DeleteProductionRecord(
  new Repositories.ProductionRecord(),
  new Repositories.Users(),
  new PassProvider()
)
