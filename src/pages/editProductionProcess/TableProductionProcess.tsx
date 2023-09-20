import { Pencil, Search } from 'lucide-react'
import { Table } from '../../components/Table'
import { ProcessesTable, SearchField } from './styles'
import { trpc } from '../../utils/api'
import { useState } from 'react'
import { type Process } from '.'

export function TableProductionProcess ({ handleEdit }: { handleEdit: (data: Process) => void }) {
  const [search, setSearch] = useState('')

  const { data: processes } = trpc.oee.getProcessesList.useQuery({
    description: search === '' ? undefined : search
  })

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
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
        />
      </SearchField>

      <ProcessesTable>
        <Table.Head>
          <th>Descrição</th>
          <th>UTE</th>
          <th>T. de Ciclo</th>
          <th> - </th>
        </Table.Head>
        <Table.Body>
          {processes?.map((process, index) => (
            <tr key={index} >
              <td>{process.description}</td>
              <td>{process.ute}</td>
              <td>{process.cycleTimeInSeconds}</td>
              <td>
                <button
                  onClick={() => { handleEdit(process) }}
                >
                  <Pencil size={15} />
                </button>
              </td>
            </tr>
          ))}
        </Table.Body>

      </ProcessesTable>
    </div>
  )
}
