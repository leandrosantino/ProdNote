import { ListProductionEfficiency } from './ListProductionEfficiency'
import { Repositories } from '../../infra/repositories'

export const listProductionEfficiency = new ListProductionEfficiency(
  new Repositories.ProductionEfficiencyRecord()
)
