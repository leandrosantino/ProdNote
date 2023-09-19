import { FormProductionProcess } from './FormProductionProcess'
import { TableProductionProcess } from './TableProductionProcess'
import { Container } from './styles'

export function EditProductionProcess () {
  return (
    <Container>
      <FormProductionProcess/>
      <TableProductionProcess/>
    </Container>
  )
}
