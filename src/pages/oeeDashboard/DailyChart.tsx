import { blueDark, grayDark } from '@radix-ui/colors'
import { Tooltip, XAxis, YAxis, Line, LineChart, ReferenceLine, Label } from 'recharts'
import { Chart } from './styles'
import { trpc } from '../../utils/api'
import { type Filters } from '.'
import { Loading } from '../../components/Loading'

export function DailyChart ({ filters: { mouth, year, ...filters } }: { filters: Filters }) {
  const { data, isLoading } = trpc.oee.getDailyChartData.useQuery({
    date: { mouth, year },
    process: filters.processId,
    turn: filters.turn,
    ute: filters.ute,
    technology: filters.technology
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
    <div id='chartDaily' >
        <LineChart
          data={data}
          margin={{
            top: 18
          }}
          width={950} height={186}
        >
          <XAxis dataKey="day" fontSize={12} fontWeight={500} color={grayDark.gray5}/>
          <YAxis
            fontSize={10} width={30}
            type='number' tickFormatter={(value: number) => `${value}%`}
            ticks={[0, 12, 24, 36, 48, 60, 72, 85, 96, 108]}
          />
          <Tooltip
            labelFormatter={(name: string) => `Dia: ${name}`}
            formatter={(value) => [Number(value).toFixed(1) + '%', 'OEE']}
          />
          <Line type="bump" dataKey="value" fill={blueDark.blue7}/>
          <ReferenceLine y={85} stroke="red">
            <Label position="top" />
          </ReferenceLine>
          {/* <Line dataKey="target" fill={blueDark.blue7}/> */}
        </LineChart>
    </div>
  </Chart>
  )
}
