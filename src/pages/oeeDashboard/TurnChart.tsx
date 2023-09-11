import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts'
import { Chart } from './styles'
import { useTheme } from 'styled-components'

const data = [
  { name: '1 truno', value: 250 },
  { name: '2 truno', value: 450 },
  { name: '3 truno', value: 300 }
]

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

export function TrunChart () {
  const { colors } = useTheme()
  const COLORS = [colors.dark.blue7, colors.dark.green9, colors.dark.gray9]

  // const { data } = trpc.oee.getTurnChartDate.useQuery({
  //   date: {
  //     mouth: 9,
  //     year: 2023
  //   }
  // })

  return (
    <Chart>
      <div>
        <h3>Perdas por Turno</h3>
      </div>
      <ResponsiveContainer width="95%" height="85%">
        <PieChart>
        <Pie
            data={data}
            cx="50%"
            cy="50%"
            isAnimationActive={true}
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout='vertical' align='right' verticalAlign='middle'/>
        </PieChart>
      </ResponsiveContainer>
    </Chart>
  )
}
