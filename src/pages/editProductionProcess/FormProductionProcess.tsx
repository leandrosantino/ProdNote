import { Field } from '../../components/Form/Field'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '../../components/Form/Button'
import { FieldCase } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Trash } from 'lucide-react'
import { trpc } from '../../utils/api'
import { useEffect, useState } from 'react'
import { type Process } from '.'

export const technologyTypesList = [
  'Hydraulic Press',
  'Hot Pressing',
  'Carpet Monding',
  'Assemble'
]

const processFormSchema = z.object({
  description: z.string().nonempty('informe a descrição do processo'),
  ute: z.string(),
  cavities: z.coerce.number().min(1, 'requer > 0').nullable(),
  cicleTime: z.coerce.number().min(1, 'requer > 0').nullable(),
  project: z.string().nonempty('obrigatório'),
  product: z.string(),
  technology: z.string(),
  machines: z.string().array().min(1, 'Selecione ao menos uma máquina!')
})

type ProcessForm = z.infer<typeof processFormSchema>

export function FormProductionProcess ({ selectedProcess }: { selectedProcess?: Process }) {
  const processForm = useForm<ProcessForm>({
    resolver: zodResolver(processFormSchema)
  })

  const { data: machines } = trpc.machine.getAll.useQuery()
  const { data: products } = trpc.product.getAll.useQuery()

  const {
    handleSubmit,
    setValue,
    watch
  } = processForm

  const [selectedMachines, setSelectedMachines] = useState('')

  useEffect(() => {
    if (selectedProcess) {
      console.log(selectedProcess?.machines)
      if (selectedProcess?.machines) {
        setValue('machines', selectedProcess?.machines?.map(entry => entry.id as string))
      }
      setValue('cavities', selectedProcess.cavitiesNumber)
      setValue('cicleTime', selectedProcess.cycleTimeInSeconds)
      setValue('description', selectedProcess.description)
      setValue('project', selectedProcess.projectNumber)
      setValue('technology', selectedProcess.technology)
      setValue('product', selectedProcess.productId)
    }
  }, [selectedProcess])

  useEffect(() => {
    if (machines) {
      const machinesSlugList = watch().machines.map(id => {
        return machines.find(entry => entry.id === id)?.slug
      })

      if (machinesSlugList) {
        setSelectedMachines(machinesSlugList.join(', '))
      }
    }
  }, [watch().machines])

  function handleSave (data: ProcessForm) {
    console.log(data)
    clearForm()
  }

  function clearForm () {
    setValue('machines', [])
    setValue('cavities', null)
    setValue('cicleTime', null)
    setValue('description', '')
    setValue('project', '')
  }

  return (
    <div>
      <h1>Processos de Produção</h1>

      <FormProvider {...processForm} >
        <form onSubmit={handleSubmit(handleSave)} >

            <Field.Root>
              <Field.Label>Descrição</Field.Label>
              <Field.Input type='text' name='description' autoComplete='false'/>
              <Field.ErrorMessage field='description' />
            </Field.Root>

            <FieldCase>

              <Field.Root>
                <Field.Label>UTE:</Field.Label>
                <Field.Select name='ute'>
                  <option value="UTE-1">UTE-1</option>
                  <option value="UTE-2">UTE-2</option>
                  <option value="UTE-3">UTE-3</option>
                  <option value="UTE-4">UTE-4</option>
                  <option value="UTE-5">UTE-5</option>
                </Field.Select>
                <Field.ErrorMessage field='ute' />
              </Field.Root>

              <Field.Root>
                <Field.Label>Projeto:</Field.Label>
                <Field.Input type='text' name='project' autoComplete='false'/>
                <Field.ErrorMessage field='project' />
              </Field.Root>

              <Field.Root>
                <Field.Label>Cavidades:</Field.Label>
                <Field.Input type='number' name='cavities' min={1} />
                <Field.ErrorMessage field='cavities' />
              </Field.Root>

              <Field.Root>
                <Field.Label>Tempo de Ciclo:</Field.Label>
                <Field.Input type='number' name='cicleTime' min={1} />
                <Field.ErrorMessage field='cicleTime' />
              </Field.Root>

            </FieldCase>

            <FieldCase>

              <Field.Root id='fieldProduct' >
                <Field.Label>Produto:</Field.Label>
                <Field.Select name='product'>
                  {products?.map(entry => (
                    <option key={entry.id} value={entry.id} >{entry.technicalDescription}</option>
                  ))}
                </Field.Select>
                <Field.ErrorMessage field='product' />
              </Field.Root>

            </FieldCase>

            <FieldCase>
              <div id="teste" >

                <Field.Root>
                  <Field.Label>Maquinas:</Field.Label>
                  <Field.Select multiple name='machines' >
                    {machines?.map(entry => (
                      <option key={entry.id} value={entry.id} >{entry.slug}</option>
                    ))}
                  </Field.Select>
                  <div id='machinesList' >{selectedMachines}</div>
                  <Field.ErrorMessage field='machines' />
                </Field.Root>

              </div>
              <div id="teste" >

                <Field.Root id='fieldTechnology' >
                  <Field.Label>Tecnologia:</Field.Label>
                  <Field.Select name='technology'>
                    {technologyTypesList.map(entry => (
                      <option key={entry} value={entry}>{entry}</option>
                    ))}
                    <option value="111">hot pressing</option>
                    <option value="111">carpet molding</option>
                  </Field.Select>
                  <Field.ErrorMessage field='technology' />
                </Field.Root>

                <div id="buttons">

                  <Button
                    type='button'
                  >
                    <Trash size={15}/>
                    Excluir
                  </Button>

                  <Button>
                    <Save size={15}/>
                    Salvar
                  </Button>

                </div>

              </div>

            </FieldCase>

        </form>
      </FormProvider>

    </div>
  )
}
