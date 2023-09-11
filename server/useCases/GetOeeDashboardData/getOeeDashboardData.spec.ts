import { GetOeeDashboardData } from './GetOeeDashboardData'
import { Repositories } from '../../infra/repositories'

(async () => {
  const teste = new GetOeeDashboardData(
    new Repositories.ProductionEfficiencyRecord()
  )

  const filters = {
    date: {
      mouth: 9,
      year: 2023
    }
  }

  await teste.getTurnChartDate(filters)
  await teste.getClassChartData(filters)
  await teste.getDailyChartData(filters)
  await teste.getGeneralOeeValue(filters)
})()
  .catch(console.log)
