import { TrashIcon } from '@radix-ui/react-icons'
import { Table } from '../../components/Table'
import { RecentTagsTable } from './styles'

export function RecentTable () {
  return (
    <RecentTagsTable>
      <Table.Head>
        <th>Descrição</th>
        <th>TagId</th>
        <th>Data</th>
        <th>Frac.</th>
        <th></th>
      </Table.Head>
      <Table.Body>
        {Array(4).fill('').map((_, index) => (
          <tr key={index}>
            <td>Carpete moldado fkfiwuegfqiwpuegfo qwefoqiuwef</td>
            <td>{'0'.repeat(24)}</td>
            <td>21/02/2022</td>
            <td>True</td>
            <td><button><TrashIcon/></button></td>
          </tr>
        ))}
      </Table.Body>
    </RecentTagsTable>
  )
}
