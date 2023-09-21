import { useEffect, useState } from 'react'
import { Table } from '../../components/Table'
import { Filter } from '../oeeDashboard/styles'
import { Container, DataTable, Header, FiltersCase } from './styles'
import { trpc } from '../../utils/api'
import { convertDateStringtoDateObject } from '../../utils/convertDateStringtoDateObject'
import { Button } from '../../components/Form/Button'
import { BarChart4 } from 'lucide-react'
import { useDialog } from '../../hooks/useDialog'
import { GenerateReportModal } from './GenerateReportModal'

export interface DateFilters {
  day?: number
  mouth: number
  year: number
}

export function EfficiencyRecords () {
  const dialog = useDialog()
  const [process, setProcess] = useState<string>('')
  const [ute, setUte] = useState<string>('')
  const [turn, setTurn] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [dateObject, setDateObject] = useState<Date>()

  const { data: productionEfficiency } = trpc.oee.listProductionEfficiency.useQuery({
    filters: {
      date: dateObject,
      process: process === '' ? undefined : process,
      turn: turn === '' ? undefined : turn,
      ute: ute === '' ? undefined : ute
    }
  })

  useEffect(() => {
    setDateObject(convertDateStringtoDateObject(date))
  }, [date])
  useEffect(() => {
    console.log(dateObject)
  }, [dateObject])

  function handleGenerateReport () {
    dialog.custom({
      Child: GenerateReportModal,
      accept () {}
    })
  }

  return (
    <Container>
      <div>
        <Header>
          <h2>Registros de Eficiência</h2>
        </Header>
        <FiltersCase>
          <div>
            <Filter>
              <label htmlFor="date">Date:</label>
              <input
                type="date" id='date'
                onChange={e => { setDate(e.target.value) }}
              />
            </Filter>
            <Filter>
              <label htmlFor="process">Processo:</label>
              <input
                id="process" type="search"
                value={process}
                onChange={e => { setProcess(e.target.value) }}
              />
            </Filter>
            <Filter>
              <label htmlFor="ute">UTE:</label>
              <select
                id="ute"
                value={ute}
                onChange={e => { setUte(e.target.value) }}
              >
                <option value="">-----</option>
                <option value="UTE-1">UTE-1</option>
                <option value="UTE-2">UTE-2</option>
                <option value="UTE-3">UTE-3</option>
                <option value="UTE-4">UTE-4</option>
                <option value="UTE-5">UTE-5</option>
              </select>
            </Filter>
            <Filter>
              <label htmlFor="turn">Turno:</label>
              <select
                id="turn"
                value={turn}
                onChange={e => { setTurn(e.target.value) }}
              >
                <option value="">--------</option>
                <option value="1">1º Turno</option>
                <option value="2">2º Turno</option>
                <option value="3">3º Turno</option>
              </select>
            </Filter>
          </div>
          <Button
            type='button'
            onClick={() => { handleGenerateReport() }}
          >
            <BarChart4 size={15} />
            Gerar Relatório
          </Button>
        </FiltersCase>

        <DataTable>
          <Table.Head>
            <th>Data</th>
            <th>Processo</th>
            <th>UTE</th>
            <th>Turno</th>
            <th>OEE</th>
            <th>Tempo Plan. (min)</th>
            <th>Peças Boas (qtd)</th>
            <th>Usuario</th>
          </Table.Head>
          <Table.Body>
            {productionEfficiency?.map((entry) => (
              <tr
                key={entry.id}
              >
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.productionProcess.description}</td>
                <td>{entry.ute}</td>
                <td>{entry.turn}º</td>
                <td>{(entry.oeeValue * 100).toFixed(1)}%</td>
                <td>{entry.productionTimeInMinutes}</td>
                <td>{entry.piecesQuantity}</td>
                <td>{entry.user.name}</td>
              </tr>
            ))}
          </Table.Body>
        </DataTable>
      </div>
    </Container>
  )
}
