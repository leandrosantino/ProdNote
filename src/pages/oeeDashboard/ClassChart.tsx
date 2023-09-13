import { Chart, Filter, FiltersCase } from './styles'
import { BarChart, Bar, Cell, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { greenDark, grayDark } from '@radix-ui/colors'
import { trpc } from '../../utils/api'
import { type Filters } from '.'
import { useEffect, useState } from 'react'
import { Loading } from '../../components/Loading'

const technologyTypesList = [
  'Hydraulic Press',
  'Hot Pressing',
  'Carpet Monding',
  'Assemble'
] as const
type Technology = typeof technologyTypesList[number]
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

  const [technology, setTechnology] = useState<string>('')
  const [turn, setTurn] = useState<string>('')

  const { data, isLoading, refetch, remove } = trpc.oee.getClassChartData.useQuery({
    date: filters,
    ...turn === '' ? {} : { turn },
    ...technology === '' ? {} : { technology: technology as Technology }
  })

  const chartData = data?.map(({ classification, value }, index) => {
    return { name: reducedNames[index], classification, value }
  })

  useEffect(() => {
    remove()
    refetch().catch(console.log)
  }, [technology, turn, filters])

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
        <FiltersCase>
          <Filter>
            <label htmlFor="trun">Truno:</label>
            <select id='turn'
              value={turn}
              onChange={(e) => { setTurn(e.target.value) }}
            >
              <option value=""> --- </option>
              <option value="1">1º</option>
              <option value="2">2º</option>
              <option value="3">3º</option>
            </select>
          </Filter>
          <Filter>
            <label htmlFor="tech">Tec:</label>
            <select id='tech'
              value={technology}
              onChange={(e) => { setTechnology(e.target.value) }}
            >
              <option value=""> ------- </option>
              {technologyTypesList.map(entry => (
                <option key={entry} value={entry}>{entry}</option>
              ))}
            </select>
          </Filter>
        </FiltersCase>
      </div>
      <div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 15
            }}
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
        </ResponsiveContainer>
      </div>
    </Chart>
  )
}
