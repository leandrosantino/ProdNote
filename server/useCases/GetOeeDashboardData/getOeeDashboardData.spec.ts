import { GetOeeDashboardData } from './GetOeeDashboardData'
import { Repositories } from '../../infra/repositories'

(async () => {
  const teste = new GetOeeDashboardData(
    new Repositories.ProductionEfficiencyRecord()
  )
  await teste.getTurnChartDate()
})()
  .catch(console.log)
