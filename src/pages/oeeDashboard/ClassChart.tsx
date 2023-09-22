import { Chart } from './styles'
import { BarChart, Bar, Cell, XAxis, Tooltip } from 'recharts'
import { greenDark, grayDark } from '@radix-ui/colors'
import { trpc } from '../../utils/api'
import { type Filters } from '.'
import { useEffect, useState } from 'react'
import { Loading } from '../../components/Loading'
import { ArrowLeft } from 'lucide-react'

const reducedNames = {
  Breakdowns: 'BD',
  'Change-Over + SMED': 'CO+SMED',
  Maintenance: 'MTC',
  'Organizational Issues': 'OI',
  'Scrap + Quality Issues': 'SQI',
  'Shift Setup': 'SS'
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

  const { data, isLoading, refetch, remove } = trpc.oee.getClassChartData.useQuery({
    date: {
      day: filters.day,
      mouth: filters.mouth,
      year: filters.year
    },
    process: filters.processId,
    turn: filters.turn,
    technology: filters.technology,
    ute: filters.ute
  })

  const chartData = data?.map(({ classification, value, percent }) => {
    return { name: reducedNames[classification as (keyof typeof reducedNames)], classification, value, percent }
  })

  const [selectedClassification, setSelectedClassification] = useState<(keyof typeof reducedNames)>()

  const reasonsChartData = trpc.oee.getLossReasonsChartData.useQuery({
    date: {
      day: filters.day,
      mouth: filters.mouth,
      year: filters.year
    },
    process: filters.processId,
    turn: filters.turn,
    ute: filters.ute,
    technology: filters.technology,
    classification: selectedClassification
  })

  useEffect(() => {
    remove()
    refetch().catch(console.log)
    setSelectedClassification(undefined)
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
        <h3>{selectedClassification ? `Top 10 perdas em- ${selectedClassification}` : 'Perdas por Classificação'}</h3>
      </div>
      <div id='chatClass'>
        {
          !selectedClassification
            ? <BarChart
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
                formatter={(...params) => {
                  const { payload } = params[2]
                  return [`${Number(payload.percent).toFixed(1)}% - ${Number(payload.value)}hrs`, '']
                }}
              />
              <Bar
                dataKey="percent"
                label={{
                  position: 'top',
                  fontSize: 14,
                  formatter: (value: number) => value === 0 ? '' : `${value.toFixed(1)}%`
                }}
                onClick={data => { setSelectedClassification(data.classification) }}
              >
                {chartData?.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                ))}
              </Bar>
            </BarChart>
            : reasonsChartData.isLoading
              ? <div id='loadCase' >
                  <Loading show={true} message='Carregndo Gráfico...'/>
                </div>
              : <>
                <button
                  onClick={() => { setSelectedClassification(undefined) }}
                >
                  <ArrowLeft size={15} strokeWidth={3} /> Voltar
                </button>
                <BarChart
                  width={560} height={250}
                  margin={{
                    top: 15
                  }}
                  data={reasonsChartData.data}
                >
                  <XAxis dataKey="index" fontSize={12} fontWeight={500} color={grayDark.gray5}/>
                  <Tooltip
                    labelFormatter={(name) => reasonsChartData.data?.find(entry => entry.index === name)?.reason}
                    separator=''
                    formatter={(...params) => {
                      const { payload } = params[2]
                      return [`${Number(payload.lostTimeInPercent).toFixed(1)}% - ${Number(payload.lostTimeInHours)}hrs`, '']
                    }}
                  />
                  <Bar
                    dataKey="lostTimeInPercent"
                    label={{
                      position: 'top',
                      fontSize: 14,
                      formatter: (value: number) => value === 0 ? '' : `${value.toFixed(1)}%`
                    }}
                    fill={COLORS[2]}
                  />
                </BarChart>
              </>
          }
      </div>
    </Chart>
  )
}
