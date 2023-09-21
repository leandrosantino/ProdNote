import { useState } from 'react'
import { FormProductionProcess, type ProcessForm } from './FormProductionProcess'
import { TableProductionProcess } from './TableProductionProcess'
import { Container } from './styles'
import { type ProductionProcess, type TechnologyKeys } from '../../../server/entities/ProductionProcess'
import { trpc, fetch } from '../../utils/api'
import { useDialog } from '../../hooks/useDialog'

import { type UteKeys } from '../../../server/entities/ProductionEfficiencyRecord'
import { useAuth } from '../../hooks/useAuth'

export type Process = Omit<ProductionProcess, 'product'>

export function EditProductionProcess () {
  const dialog = useDialog()
  const { user } = useAuth()
  const [selectedProcess, setSelectedProcess] = useState<Process | undefined>()
  const [search, setSearch] = useState('')

  const processes = trpc.oee.getProcessesList.useQuery({
    description: search === '' ? undefined : search
  })

  const updateProcessesList = async () => await processes.refetch()

  async function createProcesse (data: ProcessForm) {
    await new Promise<void>((resolve, reject) => {
      dialog.question({
        title: 'Atenção!',
        message: 'Realmente deseja criar esse processo?',
        accept () {
          fetch.productionProcess.create.mutate({
            data: {
              cavitiesNumber: data.cavities as number,
              cycleTimeInSeconds: data.cicleTime as number,
              description: data.description,
              productId: data.product,
              projectNumber: data.project,
              technology: data.technology as TechnologyKeys,
              ute: data.ute as UteKeys
            },
            machines: data.machines
          })
            .then(() => {
              dialog.alert({
                title: 'Sucesso!',
                message: 'processo criado!!'
              })
              resolve()
            })
            .catch((err: Error) => {
              dialog.alert({
                title: 'Erro!',
                message: `Falha ao criar processo!! <br> ${err.message}`,
                error: true
              })
              reject(err)
            })
        },
        refuse () {}
      })
    })
  }

  async function updateProcesse (data: ProcessForm, id?: string) {
    await new Promise<void>((resolve, reject) => {
      dialog.question({
        title: 'Atenção!',
        message: 'Realmente deseja atualizar os dados deste processo?',
        accept () {
          fetch.productionProcess.update.mutate({
            id: id as string,
            process: {
              data: {
                cavitiesNumber: data.cavities as number,
                cycleTimeInSeconds: data.cicleTime as number,
                description: data.description,
                productId: data.product,
                projectNumber: data.project,
                technology: data.technology as TechnologyKeys,
                ute: data.ute as UteKeys
              },
              machines: data.machines
            }
          })
            .then(() => {
              dialog.alert({
                title: 'Sucesso!',
                message: 'processo atualizado!!'
              })
              resolve()
            })
            .catch((err: Error) => {
              dialog.alert({
                title: 'Erro!',
                message: `Falha ao atualizar processo!! <br> ${err.message}`,
                error: true
              })
              reject(err)
            })
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
    await new Promise<void>((resolve, reject) => {
      dialog.question({
        title: 'Atenção!',
        message: 'Realmente deseja excluir este processo? <br> A ação não pode ser revertida!',
        accept () {
          dialog.prompt({
            title: 'Excluir processo',
            message: 'Insira a sua senha para continuar!',
            type: 'password',
            accept (password: string) {
              fetch.productionProcess.delete.mutate({
                password,
                productionProcessId: id,
                userId: user?.id as string
              })
                .then(() => {
                  dialog.alert({
                    title: 'Sucesso!',
                    message: 'processo excluído!!'
                  })
                  resolve()
                })
                .catch((err: Error) => {
                  dialog.alert({
                    title: 'Erro!',
                    message: `Falha ao excluir processo!! <br> ${err.message}`,
                    error: true
                  })
                  reject(err)
                })
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
