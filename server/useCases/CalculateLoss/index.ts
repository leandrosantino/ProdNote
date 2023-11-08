import { CalculateLoss } from './CalculateLoss'
import { Repositories } from '../../infra/repositories/index'

export const calculateLoss = new CalculateLoss(
  new Repositories.ProductionProcess()
)
