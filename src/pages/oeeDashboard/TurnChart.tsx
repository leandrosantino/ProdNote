import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts'
import { Chart } from './styles'
import { useTheme } from 'styled-components'
import { trpc } from '../../utils/api'
import { type Filters } from '.'
import { Loading } from '../../components/Loading'

// const data = [
//   { name: '1 truno', value: 0.3 },
//   { name: '2 truno', value: 0.5 },
//   { name: '3 truno', value: 0.2 }
// ]

interface PieLabelProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  index: number
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = (props: PieLabelProps) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export function TrunChart ({ filters }: { filters: Filters }) {
  const { colors } = useTheme()
  const COLORS = [colors.dark.blue7, colors.dark.green9, colors.dark.gray9]

  const { data, isLoading } = trpc.oee.getTurnChartDate.useQuery({ date: filters })

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
        <h3>Perdas por Turno</h3>
      </div>
      <div id='chatTurn' >
          <PieChart width={340} height={250} >
          <Pie
              data={data?.map(({ turn, value }) => ({ name: `${turn}º turno`, value }))}
              isAnimationActive={true}
              labelLine={false}
              label={renderCustomizedLabel}
              dataKey="value"
              outerRadius={'90%'}
            >
              {data?.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend margin={{ left: 50 }} layout='vertical' align='right' verticalAlign='middle'/>
          </PieChart>
      </div>
    </Chart>
  )
}
