import { Table } from '../../components/Table'
import { Container, InfoCase, InfoGroup, MessageContainer, RecentTagsTable, RegisterButton } from './styles'
import { BsSaveFill } from 'react-icons/bs'
import { TrashIcon } from '@radix-ui/react-icons'

export function RegisterTag () {
  return (
    <Container>
      <h2>Registar Etiqueta</h2>

      <section>
        <MessageContainer>
          teste
        </MessageContainer>
        <div>

          <InfoCase>
            <span>Descrição Operacional:</span>
            <div> Carpete moldado fkfiwuegfqiwpuegfo qwefoqiuwef</div>
          </InfoCase>
          <InfoCase>
            <span>Descrição Técnica:</span>
            <div>Carpete moldado fkfiwuegfqiwpuegfo qwefoqiuwef </div>
          </InfoCase>

          <InfoGroup>
            <InfoCase>
              <span>ID do Porduto:</span>
              <div> dqwfqiudhqpwiugqgwf</div>
            </InfoCase>
            <InfoCase>
              <span>ID da Etiqueta:</span>
              <div> wefaweoihwero</div>
            </InfoCase>
          </InfoGroup>

          <InfoGroup>
            <InfoCase>
              <span>Ute:</span>
              <div>ute-5</div>
            </InfoCase>
            <InfoCase>
              <span>Part Number:</span>
              <div>173849573</div>
            </InfoCase>
            <InfoCase>
              <span>Código SAP:</span>
              <div> 28164839.01</div>
            </InfoCase>
            <InfoCase>
              <span>Classificação:</span>
              <div>Acabado</div>
            </InfoCase>
          </InfoGroup>

          <InfoGroup>
            <InfoCase>
              <span>Projeto:</span>
              <div>592</div>
            </InfoCase>
            <InfoCase>
              <span>Quant. Embalagem:</span>
              <div> 20 </div>
            </InfoCase>
            {/* <InfoCase>
              <span>Quant. Fracionada:</span>
              <div>30</div>
            </InfoCase> */}
            <RegisterButton>Registrar <BsSaveFill size={15} /> </RegisterButton>
          </InfoGroup>

        </div>
      </section>

      <h3>Recentes</h3>

      <section>

      <RecentTagsTable>
        <Table.Head>
          <th>Descrição</th>
          <th>TagId</th>
          <th>Data</th>
          <th>Frac.</th>
          <th></th>
        </Table.Head>
        <Table.Body>
          {Array(4).map((_, index) => (
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
      </section>

    </Container>
  )
}
