import { useState } from 'react'
import { ClassChart } from './ClassChart'
import { DailyChart } from './DailyChart'
import { TrunChart } from './TurnChart'
import { ChartsArea, Container, FiltersCase, Header, OeeValueCase } from './styles'
import { trpc } from '../../utils/api'
import { Button } from '../../components/Form/Button'
import { FilterIcon } from 'lucide-react'
import { useDialog } from '../../hooks/useDialog'
import { SelectFilters } from './SelectFilters'

export interface Filters {
  day?: number
  mouth: number
  year: number
  process?: string
  turn?: string
  ute?: string
}

const MONTH_NAMES = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez'
]

export function OeeDashboard () {
  const now = new Date()

  const [filters, setFilters] = useState<Filters>({
    mouth: now.getMonth() + 1,
    year: now.getFullYear()
  })

  const dialog = useDialog()

  const { data, isLoading } = trpc.oee.getGeneralOeeValue.useQuery({
    date: {
      day: filters.day,
      mouth: filters.mouth,
      year: filters.year
    },
    process: filters.process,
    turn: filters.turn,
    ute: filters.ute
  })

  function handleSelectFilters () {
    dialog.custom({
      Child: SelectFilters,
      params: filters,
      accept (data: Filters) {
        setFilters(data)
      }
    })
  }

  console.log(data?.oeeValue)

  return (
    <Container>

      <Header>
        <h2>Eficiencia de Produção</h2>
        <div>
          <OeeValueCase>
            <span>OEE do {filters.day === 0 ? 'Mês' : 'Dia'}</span>
            <span>{isLoading ? '00.0%' : (`${data?.oeeValue ?? '0.00'}%` ?? '00.0%')}</span>
          </OeeValueCase>
        </div>
        <FiltersCase>
          <div>
            <p style={{ fontSize: '1.2rem' }} >
              {filters.day ? `${filters.day.toString().padStart(2, '0')} de ` : ''}
              {MONTH_NAMES[filters.mouth - 1]} de {filters.year}
              {filters.turn ? ` , ${filters.turn}º Turno` : ''}
              {filters.ute ? ` , ${filters.ute}` : ''}
            </p>
            <p style={{ fontSize: '1.2rem' }} >Cargo Load 521 - (M24, M26, M27)</p>

          </div>
          <Button
            onClick={() => { handleSelectFilters() }}
          >
            <FilterIcon size={15}/>
            Filtrar
          </Button>
          {/* <Filter>
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
          </Filter>
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
