import { RegisterProductionEfficiency } from './RegisterProductionEfficiency'
import { Repositories } from '../../infra/repositories'

export const registerProductionEfficiency = new RegisterProductionEfficiency(
  new Repositories.ProductionEfficiencyRecord(),
  new Repositories.ProductionProcess()
)
