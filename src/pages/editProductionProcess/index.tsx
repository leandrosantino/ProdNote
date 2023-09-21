import { useState } from 'react'
import { FormProductionProcess, type ProcessForm } from './FormProductionProcess'
import { TableProductionProcess } from './TableProductionProcess'
import { Container } from './styles'
import { type ProductionProcess } from '../../../server/entities/ProductionProcess'
import { trpc } from '../../utils/api'
import { useDialog } from '../../hooks/useDialog'

export type Process = Omit<ProductionProcess, 'product'>

export function EditProductionProcess () {
  const dialog = useDialog()
  const [selectedProcess, setSelectedProcess] = useState<Process | undefined>()
  const [search, setSearch] = useState('')

  const processes = trpc.oee.getProcessesList.useQuery({
    description: search === '' ? undefined : search
  })

  const updateProcessesList = async () => await processes.refetch()

  async function createProcesse (data: ProcessForm) {
    await new Promise<void>((resolve) => {
      dialog.question({
        title: 'Atenção!',
        message: 'Realmente deseja criar esse processo?',
        accept () {
          console.log('create', data)
          dialog.alert({
            title: 'Sucesso!',
            message: 'processo criado!!'
          })
          resolve()
        },
        refuse () {}
      })
    })
  }

  async function updateProcesse (data: ProcessForm, id?: string) {
    await new Promise<void>((resolve) => {
      dialog.question({
        title: 'Atenção!',
        message: 'Realmente deseja atualizar os dados deste processo?',
        accept () {
          console.log('update', id, data)
          dialog.alert({
            title: 'Sucesso!',
            message: 'processo atualizado!!'
          })
          resolve()
        },
        refuse () {}
      })
    })
  }

  async function handleSave (data: ProcessForm, id?: string) {
    if (id) {
      await updateProcesse(data, id)
    } else {
      await createProcesse(data)
    }
    setSelectedProcess(undefined)
    await updateProcessesList()
  }

  async function handleDelete (id: string) {
    await new Promise<void>((resolve) => {
      dialog.question({
        title: 'Atenção!',
        message: 'Realmente deseja excluir este processo? <br> A ação não pode ser revertida!',
        accept () {
          dialog.prompt({
            title: 'Excluir processo',
            message: 'Insira a sua senha para continuar!',
            type: 'password',
            accept (password: string) {
              console.log('delete', id, password)
              dialog.alert({
                title: 'Sucesso!',
                message: 'processo excluído!!'
              })
              resolve()
            },
            refuse () {}
          })
        },
        refuse () {}
      })
    })
    setSelectedProcess(undefined)
    await updateProcessesList()
  }

  async function handleCancel () {
    await new Promise<void>((resolve) => {
      dialog.question({
        title: 'Atenção!',
        message: 'Realmente deseja descartar as alterações?',
        accept () {
          setSelectedProcess(undefined)
          resolve()
        },
        refuse () {}
      })
    })
  }

  return (
    <Container>
      <FormProductionProcess
        {...{ selectedProcess, handleSave, handleCancel }}
      />
      <TableProductionProcess
        handleDelete={handleDelete}
        searchFieldValue={search}
        setSearchFieldValue={setSearch}
        data={processes.data}
        handleEdit={process => { setSelectedProcess(process) }}
      />
    </Container>
  )
}
