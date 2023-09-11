import { ClassChart } from './ClassChart'
import { DailyChart } from './DailyChart'
import { TrunChart } from './TurnChart'
import { ChartsArea, Container, Filter, FiltersCase, Header, OeeValueCase } from './styles'

export function OeeDashboard () {
  return (
    <Container>

      <Header>
        <h2>Eficiencia de Produção</h2>
        <div>
          <OeeValueCase>
            <span>OEE do Dia</span>
            <span>70.2%</span>
          </OeeValueCase>
        </div>
        <FiltersCase>
          <Filter>
            <label htmlFor="day">Dia:</label>
            <select id='day' >
              <option value="1">01</option>
            </select>
          </Filter>
          <Filter>
            <label htmlFor="mouth">Mês:</label>
            <select id='mouth' >
              <option value="1">Jan</option>
              <option value="1">Fev</option>
            </select>
          </Filter>
          <Filter>
            <label htmlFor="year">Ano:</label>
            <select id='year' >
              <option value="1">2023</option>
            </select>
          </Filter>
        </FiltersCase>
      </Header>

      <ChartsArea>
        <TrunChart/>
        <ClassChart/>
        <DailyChart/>
      </ChartsArea>

    </Container>
  )
}
