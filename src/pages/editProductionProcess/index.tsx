import { useState } from 'react'
import { FormProductionProcess } from './FormProductionProcess'
import { TableProductionProcess } from './TableProductionProcess'
import { Container } from './styles'
import { type ProductionProcess } from '../../../server/entities/ProductionProcess'

export type Process = Omit<ProductionProcess, 'product'>

export function EditProductionProcess () {
  const [selectedProcess, setSelectedProcess] = useState<Process | undefined>()
  return (
    <Container>
      <FormProductionProcess
        {...{ selectedProcess }}
      />
      <TableProductionProcess
        handleEdit={process => { setSelectedProcess(process) }}
      />
    </Container>
  )
}
