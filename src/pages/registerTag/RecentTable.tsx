import { TrashIcon } from '@radix-ui/react-icons'
import { Table } from '../../components/Table'
import { RecentTagsTable } from './styles'
import { type Recents } from './index'

interface RecentTableProps {
  data: Recents[] | null
  handleDelete: (id: string) => void
}

export function RecentTable ({ data, handleDelete }: RecentTableProps) {
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
        {data
          ? data.map(entry => (
          <tr key={entry.tagId}>
            <td>{entry.description}</td>
            <td>{entry.tagId}</td>
            <td>{new Date(entry.date).toLocaleDateString()}</td>
            <td>{entry.isFractional ? 'sim' : 'não'}</td>
            <td><button onClick={() => { handleDelete(entry.tagId) } } ><TrashIcon/></button></td>
          </tr>
          ))
          : <></>}
      </Table.Body>
    </RecentTagsTable>
  )
}
