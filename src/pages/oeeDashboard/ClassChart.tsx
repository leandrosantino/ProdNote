import { Chart } from './styles'
import { BarChart, Bar, Cell, XAxis, Tooltip } from 'recharts'
import { greenDark, grayDark } from '@radix-ui/colors'
import { trpc } from '../../utils/api'
import { type Filters } from '.'
import { useEffect } from 'react'
import { Loading } from '../../components/Loading'

const reducedNames = [
  'BD',
  'CO+SMED',
  'MTC',
  'OI',
  'SQI',
  'SS'
]

export function ClassChart ({ filters }: { filters: Filters }) {
  const COLORS = [
    greenDark.green11,
    greenDark.green10,
    greenDark.green9,
    greenDark.green8,
    greenDark.green7,
    greenDark.green6
  ]

  const { data, isLoading, refetch, remove } = trpc.oee.getClassChartData.useQuery({
    date: filters
  })

  const chartData = data?.map(({ classification, value }, index) => {
    return { name: reducedNames[index], classification, value }
  })

  useEffect(() => {
    remove()
    refetch().catch(console.log)
    console.log(chartData)
  }, [filters])

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
        <h3>Perdas por Classificação</h3>
      </div>
      <div id='chatClass'>
          <BarChart
            width={560} height={250}
            margin={{
              top: 15
            }}
            data={chartData}
          >
            <XAxis dataKey="name" fontSize={12} fontWeight={500} color={grayDark.gray5}/>
            <Tooltip
              labelFormatter={(name) => chartData?.find(entry => entry.name === name)?.classification}
              separator=''
              formatter={(value) => [Number(value).toFixed(1) + '%', '']}
            />
            <Bar dataKey="value" label={{
              position: 'top',
              fontSize: 14,
              formatter: (value: number) => value === 0 ? '' : `${value.toFixed(1)}%`
            }} >
              {chartData?.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
              ))}
            </Bar>
          </BarChart>
      </div>
    </Chart>
  )
}
