import { Table } from '../../components/Table'
import { trpc } from '../../utils/api'
import { Container, Content, HistoryTable } from './styles'

export function DatabaseHistory () {
  const backupHistory = trpc.backupHistory.getAll.useQuery()

  return (
    <Container>
      <Content>
          <h1>Histórico de Backup</h1>

          <HistoryTable>
            <Table.Head>
              <th>Data</th>
              <th>Local</th>
            </Table.Head>
            <Table.Body>
              {backupHistory?.data?.map(entry => (
                <tr key={entry.id} >
                  <td>{new Date(entry.date).toLocaleString()}</td>
                  <td>{entry.local}</td>
                </tr>
              ))}
            </Table.Body>
          </HistoryTable>

      </Content>
    </Container>
  )
}
