import { GetOeeDashboardData } from './GetOeeDashboardData'
import { Repositories } from '../../infra/repositories'
import { type GetOeeDashboardDataRequestDTO } from './GetOeeDashboardDataDTO'

(async () => {
  const teste = new GetOeeDashboardData(
    new Repositories.ProductionEfficiencyRecord()
  )

  const filters: GetOeeDashboardDataRequestDTO = {
    date: {
      mouth: 9,
      year: 2023
    },
    classification: 'Breakdowns'

  }

  await teste.getClassChartData(filters)
  await teste.getLossReasonsChart(filters)
  await teste.getTurnChartDate(filters)
  await teste.getDailyChartData(filters)
  await teste.getGeneralOeeValue(filters)
})()
  .catch(console.log)
