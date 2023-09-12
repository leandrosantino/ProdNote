import { Chart, Filter, FiltersCase } from './styles'
import { BarChart, Bar, Cell, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { greenDark, grayDark } from '@radix-ui/colors'
import { trpc } from '../../utils/api'
import { type Filters } from '.'
import { useState } from 'react'
import { Loading } from '../../components/Loading'

// const data = [
//   { classification: 'Breakdowns', value: 13 },
//   { classification: 'Change-Over + SMED', value: 56 },
//   { classification: 'Maintenance', value: 85 },
//   { classification: 'Organizational Issues', value: 50 },
//   { classification: 'Scrap + Quality Issues', value: 21 },
//   { classification: 'Shift Setup', value: 96 }
// ]

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

const renderCustomizedLabel = (props: {
  width: number
  x: number
  y: number
  value: number
}) => {
  const textLength = 40
  if (props.value <= 0) {
    return <></>
  }
  return (
    <text
      x={props.x + (props.width / 2) - (textLength / 2)}
      width={props.width} y={props.y - 10}
      textLength={textLength} fontSize={14} fontWeight={500}
      dominantBaseline="central"
      color={grayDark.gray5}
    >
      {`${props.value.toFixed(1)}%`}
    </text>
  )
}

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

  const { data, isLoading } = trpc.oee.getClassChartData.useQuery({
    date: filters,
    ...turn === '' ? {} : { turn },
    ...technology === '' ? {} : { technology: technology as Technology }
  })

  const chartData = data?.map(({ classification, value }, index) => {
    return { name: reducedNames[index], classification, value }
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
            <Bar dataKey="value" label={renderCustomizedLabel}>
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
