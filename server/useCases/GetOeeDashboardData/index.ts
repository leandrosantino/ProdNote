import { GetOeeDashboardData } from './GetOeeDashboardData'
import { Repositories } from '../../infra/repositories'

export const getOeeDashboardData = new GetOeeDashboardData(
  new Repositories.ProductionEfficiencyRecord()
)
