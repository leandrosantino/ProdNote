import { Pencil, Search, Trash } from 'lucide-react'
import { Table } from '../../components/Table'
import { ProcessesTable, SearchField } from './styles'
import { type Process } from '.'

interface TableProductionProcessProps {
  handleEdit: (data: Process) => void
  data?: Process[]
  setSearchFieldValue: (value: string) => void
  handleDelete: (id: string) => void
  searchFieldValue: string
}

export function TableProductionProcess ({ handleEdit, data, setSearchFieldValue, searchFieldValue, handleDelete }: TableProductionProcessProps) {
  return (
    <div>
      <SearchField>
        <label htmlFor="search">
          <Search size={20}/>
        </label>
        <input
          type="search"
          id="search"
          autoComplete='false'
          value={searchFieldValue}
          onChange={(e) => { setSearchFieldValue(e.target.value) }}
        />
      </SearchField>

      <ProcessesTable>
        <Table.Head>
          <th>Descrição</th>
          <th>UTE</th>
          <th>Ciclo</th>
          <th> - </th>
          <th> - </th>
        </Table.Head>
        <Table.Body>
          {data?.map((process, index) => (
            <tr key={index} >
              <td>{process.description}</td>
              <td>{process.ute}</td>
              <td>{process.cycleTimeInSeconds}sec</td>
              <td>
                <button
                  onClick={() => { handleEdit(process) }}
                >
                  <Pencil size={15} />
                </button>
              </td>
              <td>
                <button
                  onClick={() => { handleDelete(process.id as string) }}
                >
                  <Trash size={15} />
                </button>
              </td>
            </tr>
          ))}
        </Table.Body>

      </ProcessesTable>
    </div>
  )
}
