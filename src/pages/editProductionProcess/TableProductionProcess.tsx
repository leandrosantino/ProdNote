import { Pencil } from 'lucide-react'
import { Table } from '../../components/Table'
import { ProcessesTable } from './styles'

export function TableProductionProcess () {
  return (
    <div>
      <ProcessesTable>
        <Table.Head>
          <th>Descrição</th>
          <th>UTE</th>
          <th>T. de Ciclo</th>
          <th> - </th>
        </Table.Head>
        <Table.Body>
          {Array(10).fill(' ').map((_, index) => (
            <tr key={index} >
              <td>Cargo Load 521 - (M24, M26, M27)</td>
              <td>UTE-4</td>
              <td>63</td>
              <td>
                <button>
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
