import { Pencil, Save, Search, Trash, X } from 'lucide-react'
import { SearchField } from '../editProductionProcess/styles'
import { Container, Content, Form, ReasonsTable, SearchCase, TableCase } from './styles'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Field } from '../../components/Form/Field'
import { Button } from '../../components/Form/Button'
import { Table } from '../../components/Table'
import { trpc } from '../../utils/api'
import { useEffect, useState } from 'react'

const reasonsLossTypes = [
  'scrap',
  'rework',
  'stoppages',
  'mechanical',
  'electrical',
  'tooling'
] as const

type ReasonsLossTypesKey = typeof reasonsLossTypes[number]

const translateReasonsLossTypes: Record<ReasonsLossTypesKey, string> = {
  scrap: 'Scrap',
  rework: 'Retrabalho',
  stoppages: 'Paradas',
  mechanical: 'Mecânica',
  electrical: 'Elétrica',
  tooling: 'Ferramental'
}

export const classificationTypesList = [
  'Shift Setup',
  'Change-Over + SMED',
  'Breakdowns',
  'Maintenance',
  'Scrap + Quality Issues',
  'Organizational Issues'
] as const

const reasonsLossFromSchema = z.object({
  description: z.string().nonempty('informe a descrição'),
  type: z.enum(reasonsLossTypes),
  classification: z.enum(classificationTypesList)
})

type ReasonsLossFrom = z.infer<typeof reasonsLossFromSchema>

interface ReasonsLoss extends ReasonsLossFrom {
  id: string
}

export function EditReasonsLoss () {
  const reasonsLossFrom = useForm<ReasonsLossFrom>({
    resolver: zodResolver(reasonsLossFromSchema)
  })

  const {
    handleSubmit,
    setValue,
    reset
  } = reasonsLossFrom

  const [description, setDescription] = useState('')
  const [type, setType] = useState<ReasonsLossTypesKey | ''>('')
  const [selectedReason, setSelectedReason] = useState<ReasonsLoss>()

  useEffect(() => {
    if (selectedReason) {
      setValue('description', selectedReason.description)
      setValue('type', selectedReason.type)
      setValue('classification', selectedReason.classification)
      return
    }
    setValue('description', '')
    setValue('type', 'scrap')
    setValue('classification', 'Shift Setup')
  }, [selectedReason])

  const reasonsLoss = trpc.reasonsLossEfficiency.findMany.useQuery({
    description: description === '' ? undefined : description,
    type: type === '' ? undefined : type
  })

  function handleSave (data: ReasonsLossFrom) {
    console.log(data)
    if (selectedReason) {
      setSelectedReason(undefined)
      reset()
      return
    }
    reset()
  }

  return (
    <Container>
      <Content>
        <h1>Motivos de Perda</h1>

        <FormProvider {...reasonsLossFrom} >
          <Form onSubmit={handleSubmit(handleSave)}>

            <Field.Root>
              <Field.Label>Tipo:</Field.Label>
              <Field.Select name='type' >
                {reasonsLossTypes.map(entry => (
                  <option key={entry + '1'} value={entry}>{translateReasonsLossTypes[entry]}</option>
                ))}
              </Field.Select>
              <Field.ErrorMessage field='type' />
            </Field.Root>

            <Field.Root>
              <Field.Label>Descrição:</Field.Label>
              <Field.Input type='text' name='description' autoComplete='off'/>
              <Field.ErrorMessage field='description' />
            </Field.Root>

            <Field.Root>
              <Field.Label>Classificação:</Field.Label>
              <Field.Select name='classification' >
                {classificationTypesList.map(entry => (
                  <option key={entry} value={entry}>{entry}</option>
                ))}
              </Field.Select>
              <Field.ErrorMessage field='classification' />
            </Field.Root>

            {selectedReason &&
              <Button
                id='btDelete'
                type='button'
                onClick={() => { setSelectedReason(undefined) }}
              >
                <X size={15} /> limpar
              </Button>
            }
            <Button> <Save size={15} /> {selectedReason ? 'Salvar' : 'Adicionar'}</Button>

          </Form>
        </FormProvider>

        <TableCase>
          <SearchCase>
            <SearchField>
              <label htmlFor="search">
                <Search size={20}/>
              </label>
              <input
                type="search"
                id="search"
                autoComplete='off'
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
              />
            </SearchField>
            <SearchField>
              <label htmlFor="type">
                Tipo:
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => { setType(e.target.value as ReasonsLossTypesKey) }}
              >
                <option value=""> ----- </option>
                {reasonsLossTypes.map(entry => (
                  <option key={entry + '1'} value={entry}>{translateReasonsLossTypes[entry]}</option>
                ))}
              </select>
            </SearchField>
          </SearchCase>

          <ReasonsTable>
            <Table.Head>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Class.</th>
              <th> - </th>
              <th> - </th>
            </Table.Head>
            <Table.Body>
              {reasonsLoss.data?.map(entry => (
                <tr key={entry.id} >
                  <td>{translateReasonsLossTypes[entry.type]}</td>
                  <td>{entry.description}</td>
                  <td>{entry.classification}</td>
                  <td>
                    <button
                      onClick={() => { setSelectedReason(entry) }}

                    > <Pencil size={15} /> </button>
                  </td>
                  <td>
                    <button> <Trash size={15} /> </button>
                  </td>
                </tr>
              ))}
            </Table.Body>
          </ReasonsTable>

        </TableCase>

      </Content>
    </Container>
  )
}
