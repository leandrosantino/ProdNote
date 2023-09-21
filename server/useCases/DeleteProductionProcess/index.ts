import { Repositories } from '../../infra/repositories'
import { PassProvider } from '../../providers/implementations/PassProvider'
import { DeleteProductionProcess } from './DeleteProductionProcess'

export const deleteProductionProcess = new DeleteProductionProcess(
  new Repositories.ProductionProcess(),
  new Repositories.Users(),
  new PassProvider()
)
