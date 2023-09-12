import { useEffect, useState } from 'react'
import { ClassChart } from './ClassChart'
import { DailyChart } from './DailyChart'
import { TrunChart } from './TurnChart'
import { ChartsArea, Container, Filter, FiltersCase, Header, OeeValueCase } from './styles'
import { trpc } from '../../utils/api'

export interface Filters {
  day?: number
  mouth: number
  year: number
}

export function OeeDashboard () {
  const now = new Date()
  const [day, setDay] = useState<number>(0)
  const [month, setMonth] = useState<number>(now.getMonth() + 1)
  const [year, setYear] = useState<number>(now.getFullYear())
  const [monthFinishDay, setMonthFinishDay] = useState<number>()
  const [inputMonth, setInputMonth] = useState<string>(
    `${year}-${month.toString().padStart(2, '0')}`
  )

  const [filters, setFilters] = useState<Filters>({
    mouth: month,
    year,
    day
  })

  useEffect(() => {
    setFilters({
      day: day === 0 ? undefined : day,
      mouth: month,
      year
    })
  }, [day, month, year])

  useEffect(() => {
    const mouthIndex = month - 1
    setMonthFinishDay(new Date(year, mouthIndex + 1, 0).getDate())
  }, [year, month])

  useEffect(() => {
    try {
      const [year, month] = inputMonth.split('-').map(entry => Number(entry))
      setMonth(month)
      setYear(year)
    } catch {}
  }, [inputMonth])

  const { data, isLoading } = trpc.oee.getGeneralOeeValue.useQuery({
    date: filters
  })

  console.log(data?.oeeValue)

  return (
    <Container>

      <Header>
        <h2>Eficiencia de Produção</h2>
        <div>
          <OeeValueCase>
            <span>OEE do {day === 0 ? 'Mês' : 'Dia'}</span>
            <span>{isLoading ? '00.0%' : (`${data?.oeeValue as number}%` ?? '00.0%')}</span>
          </OeeValueCase>
        </div>
        <FiltersCase>
          <Filter>
            <label htmlFor="day">Dia:</label>
            <select id='day'
              value={day}
              onChange={e => { setDay(Number(e.target.value)) }}
            >
              <option value="0"> -- </option>
              {Array(monthFinishDay).fill('').map((_, index) => (
                <option key={index} value={index + 1}>{index + 1}</option>
              ))}
            </select>
          </Filter>
          <Filter>
            <label htmlFor="month">Mês:</label>
            <input
              type="month" id='month'
              value={inputMonth}
              onChange={e => { setInputMonth(e.target.value) }}
            />
            {/* <select id='mouth' >
              <option value="1">Jan</option>
              <option value="2">Fev</option>
              <option value="3">Mar</option>
              <option value="4">Abr</option>
              <option value="5">Mai</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Ago</option>
              <option value="9">Set</option>
              <option value="10">Out</option>
              <option value="11">Nov</option>
              <option value="12">Dez</option>
            </select> */}
          </Filter>
          {/* <Filter>
            <label htmlFor="year">Ano:</label>
            <input
              type="number"
              id='year' min={2023}
              value={year}
              onChange={e => { setYear(Number(e.target.value)) }}
            />

          </Filter> */}
        </FiltersCase>
      </Header>

      <ChartsArea>
        <TrunChart {...{ filters }} />
        <ClassChart {...{ filters }} />
        <DailyChart {...{ filters }} />
      </ChartsArea>

    </Container>
  )
}
