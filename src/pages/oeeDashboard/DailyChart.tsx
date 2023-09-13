import { blueDark, grayDark } from '@radix-ui/colors'
import { ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart } from 'recharts'
import { Chart } from './styles'
import { trpc } from '../../utils/api'
import { type Filters } from '.'
import { Loading } from '../../components/Loading'

export function DailyChart ({ filters: { mouth, year } }: { filters: Filters }) {
  const { data, isLoading } = trpc.oee.getDailyChartData.useQuery({
    date: { mouth, year }
  })

  if (isLoading) {
    return (
      <Chart loading={true} >
        <Loading show={true} message='Carregndo Gráfico...'/>
      </Chart>
    )
  }

  return (
    <Chart>
    <div>
      <h3>OEE por Dia</h3>

    </div>
    <div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 18
          }}
        >
          <XAxis dataKey="day" fontSize={12} fontWeight={500} color={grayDark.gray5}/>
          <YAxis fontSize={10} width={30} type='number' tickFormatter={(value: number) => `${value}%`}/>
          <Tooltip
            labelFormatter={(name: string) => `Dia: ${name}`}
            formatter={(value) => [Number(value).toFixed(1) + '%', 'OEE']}
          />
          <Line type="bump" dataKey="value" fill={blueDark.blue7}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Chart>
  )
}
