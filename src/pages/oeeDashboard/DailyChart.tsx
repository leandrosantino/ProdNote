import { blueDark, grayDark } from '@radix-ui/colors'
import { BarChart, ResponsiveContainer, Tooltip, Bar, XAxis, YAxis } from 'recharts'
import { Chart } from './styles'
import { trpc } from '../../utils/api'
import { type Filters } from '.'
import { Loading } from '../../components/Loading'

// const data = [
//   { day: 1, value: 0 }, { day: 2, value: 0 },
//   { day: 3, value: 0 }, { day: 4, value: 0 },
//   { day: 5, value: 0 }, { day: 6, value: 74.2 },
//   { day: 7, value: 99.8 }, { day: 8, value: 0 },
//   { day: 9, value: 0 }, { day: 10, value: 100 },
//   { day: 11, value: 0 }, { day: 12, value: 0 },
//   { day: 13, value: 0 }, { day: 14, value: 0 },
//   { day: 15, value: 0 }, { day: 16, value: 0 },
//   { day: 17, value: 0 }, { day: 18, value: 0 },
//   { day: 19, value: 0 }, { day: 20, value: 0 },
//   { day: 21, value: 0 }, { day: 22, value: 0 },
//   { day: 23, value: 0 }, { day: 24, value: 0 },
//   { day: 25, value: 0 }, { day: 26, value: 0 },
//   { day: 27, value: 0 }, { day: 28, value: 0 },
//   { day: 29, value: 0 }, { day: 30, value: 0 }
// ]

const renderCustomizedLabel = (props: {
  width: number
  x: number
  y: number
  value: number
}) => {
  const textLength = 30
  if (props.value <= 0) {
    return <></>
  }
  return (
    <text
      x={props.x + (props.width / 2) - (textLength / 2)}
      width={props.width} y={props.y - 10}
      textLength={textLength} fontSize={10} fontWeight={500}
      dominantBaseline="central"
      color={grayDark.gray5}
    >
      {`${props.value.toFixed(1)}%`}
    </text>
  )
}

export function DailyChart ({ filters }: { filters: Filters }) {
  const { data, isLoading } = trpc.oee.getDailyChartData.useQuery({ date: filters })

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
        <BarChart
          data={data}
          margin={{
            top: 15
          }}
        >
          <XAxis dataKey="day" fontSize={12} fontWeight={500} color={grayDark.gray5}/>
          <YAxis fontSize={10} width={30} type='number' tickFormatter={(value: number) => `${value}%`}/>
          <Tooltip
            labelFormatter={(name: string) => `Dia: ${name}`}
            formatter={(value) => [Number(value).toFixed(1) + '%', 'OEE']}
          />
          <Bar dataKey="value" label={renderCustomizedLabel} fill={blueDark.blue7}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </Chart>
  )
}
