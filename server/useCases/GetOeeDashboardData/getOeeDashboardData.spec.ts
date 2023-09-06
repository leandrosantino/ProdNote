import { GetOeeDashboardData } from './GetOeeDashboardData'
import { Repositories } from '../../infra/repositories'

(async () => {
  const teste = new GetOeeDashboardData(
    new Repositories.ProductionEfficiencyRecord()
  )
  await teste.getTurnChartDate({
    date: {
      mouth: 9,
      year: 2023
    }
  })

  await teste.getClassChartData({
    date: {
      mouth: 9,
      year: 2023
    }
  })

  await teste.getDailyChartData({
    date: {
      mouth: 9,
      year: 2023
    }
  })
})()
  .catch(console.log)
