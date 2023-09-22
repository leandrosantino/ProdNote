import { zodResolver } from '@hookform/resolvers/zod'
import { type DialogProps } from '../../contexts/dialogContext'
import { SelectFiltersContent } from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Field } from '../../components/Form/Field'
import { Button } from '../../components/Form/Button'
import { useEffect, useState } from 'react'
import { type Filters } from '.'
import { trpc } from '../../utils/api'
import { type TechnologyKeys } from '../../../server/entities/ProductionProcess'

const filtersFormSchema = z.object({
  month: z.string(),
  day: z.coerce.number(),
  turn: z.string(),
  ute: z.string(),
  process: z.string(),
  technology: z.string()
})

export const technologyTypesList = [
  'Hydraulic Press',
  'Hot Pressing',
  'Carpet Monding',
  'Assemble'
]

export type FiltersForm = z.infer<typeof filtersFormSchema>

interface SelectFiltersProps extends DialogProps {
  params?: Filters
}

export function SelectFilters ({ params, ...props }: SelectFiltersProps) {
  const filtersForm = useForm<FiltersForm>({
    resolver: zodResolver(filtersFormSchema)
  })
  const {
    handleSubmit,
    setValue,
    watch,
    getValues
  } = filtersForm

  const { data: processes } = trpc.oee.getProcessesList.useQuery({
    ute: watch().ute === '' ? undefined : watch().ute
  })

  useEffect(() => {
    if (params) {
      setValue('month', yearAndMonthToInputMonth(params.year, params.mouth ?? ''))
      setValue('process', params.processId ?? '')
      setValue('turn', params.turn ?? '')
      setValue('ute', params.ute ?? '')
      setValue('technology', params.technology ?? '')
    }
  }, [])

  const [monthFinishDay, setMonthFinishDay] = useState<number>()

  useEffect(() => {
    const [year, month] = splitInputMonth(getValues('month'))
    if (year && month) {
      const mouthIndex = month - 1
      setMonthFinishDay(new Date(year, mouthIndex + 1, 0).getDate())
      return
    }
    if (params) {
      setMonthFinishDay(new Date(params.year, params.mouth, 0).getDate())
    }
  }, [watch().month])

  function splitInputMonth (input: string) {
    try {
      return input.split('-').map(entry => Number(entry))
    } catch {
      return []
    }
  }

  function yearAndMonthToInputMonth (year: number, month: number) {
    return `${year}-${month.toString().padStart(2, '0')}`
  }

  function submit (data: FiltersForm) {
    if (props.finally && props.accept) {
      const [year, month] = splitInputMonth(data.month)
      if (year && month) {
        props.accept({
          year,
          mouth: month,
          day: data.day,
          processId: data.process === '' ? undefined : data.process,
          turn: data.turn === '' ? undefined : data.turn,
          ute: data.ute === '' ? undefined : data.ute,
          processDescription: processes?.find(entry => entry.id === data.process)?.description,
          technology: data.technology === '' ? undefined : data.technology as TechnologyKeys
        } as Filters)
        props.finally()
      }
    }
  }

  return (
    <SelectFiltersContent>
      <h1>Filtrar Dashboard</h1>
      <FormProvider {...filtersForm} >
        <form onSubmit={handleSubmit(submit)} >
          <div>
            <Field.Root>
              <Field.Label htmlFor='process' >Processo:</Field.Label>
              <Field.Select id='process' name='process'>
                <option value=""> ------------- </option>
                {processes?.map(entry => (
                  <option key={entry.id} value={entry.id}>{entry.description}</option>
                ))}
              </Field.Select>
              <Field.ErrorMessage field='process'/>
            </Field.Root>
            <Field.Root>
              <Field.Label htmlFor='technology' >Tecnologia:</Field.Label>
              <Field.Select id='technology' name='technology'>
                <option value=""> ------------- </option>
                {technologyTypesList?.map(entry => (
                  <option key={entry} value={entry}>{entry}</option>
                ))}
              </Field.Select>
              <Field.ErrorMessage field='technology'/>
            </Field.Root>
          </div>
          <div>
            <Field.Root>
              <Field.Label htmlFor='day' >Dia:</Field.Label>
              <Field.Select id='day' name='day' >
                <option value="0"> -- </option>
                {Array(monthFinishDay).fill('').map((_, index) => (
                  <option key={index} value={index + 1}>{index + 1}</option>
                ))}
              </Field.Select>
              <Field.ErrorMessage field='day'/>
            </Field.Root>

            <Field.Root>
              <Field.Label htmlFor='month' >Mês:</Field.Label>
              <Field.Input id='month' type='month' name='month' />
              <Field.ErrorMessage field='month'/>
            </Field.Root>

            <Field.Root>
              <Field.Label htmlFor='turn' >Turno:</Field.Label>
              <Field.Select id='turn' name='turn' >
                <option value=""> ----- </option>
                <option value="1">1º Turno</option>
                <option value="2">2º Turno</option>
                <option value="3">3º Turno</option>
              </Field.Select>
              <Field.ErrorMessage field='turn'/>
            </Field.Root>

            <Field.Root>
              <Field.Label htmlFor='ute' >Ute:</Field.Label>
              <Field.Select id='ute' name='ute' >
                <option value=""> ----- </option>
                <option value="UTE-1">UTE-1</option>
                <option value="UTE-2">UTE-2</option>
                <option value="UTE-3">UTE-3</option>
                <option value="UTE-4">UTE-4</option>
                <option value="UTE-5">UTE-5</option>
              </Field.Select>
              <Field.ErrorMessage field='ute'/>
            </Field.Root>
          </div>

          <div>
            <Button>
              Aplicar
            </Button>
          </div>

        </form>

      </FormProvider>
    </SelectFiltersContent>
  )
}
