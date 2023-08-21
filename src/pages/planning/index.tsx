import { z } from 'zod'
import { Field } from '../../components/Form/Field'
import { Table } from '../../components/Table'
import { Container, FormCase, ScriptTable } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '../../components/Form/Button'
import { trpc } from '../../utils/api'
import { useEffect } from 'react'

const productionPlanFormSchema = z.object({
  productiveDays: z.coerce.number().min(1, '>=1'),
  lowRunner: z.coerce.number().min(1, '>=1'),
  highRunner: z.coerce.number().min(1, '>=1'),
  products: z.array(z.object({
    stock: z.coerce.number().min(1, '>=1'),
    demand: z.coerce.number().min(1, '>=1')
  }))
    .min(2, 'Adicione no mínimo 2 produto')
})

type ProductionPlanForm = z.infer<typeof productionPlanFormSchema>

export function Planning () {
  const productionPlanForm = useForm<ProductionPlanForm>({
    resolver: zodResolver(productionPlanFormSchema)
  })

  const { handleSubmit, setValue } = productionPlanForm

  function timeInMillisecondsToString (milliseconds: number) {
    const timeInFloatHours = milliseconds / 1000 / 60 / 60
    const hours = parseInt(timeInFloatHours.toString())
    const minutes = parseInt(((timeInFloatHours * 60) % 60).toString())
    return `${hours}:${minutes}h`
  }

  useEffect(() => {
    setValue('products', [
      { stock: 100, demand: 500 },
      { stock: 260, demand: 600 },
      { stock: 200, demand: 450 },
      { stock: 300, demand: 500 },
      { stock: 300, demand: 500 },
      { stock: 300, demand: 500 },
      { stock: 300, demand: 500 }
    ])
    setValue('productiveDays', 6)
    setValue('lowRunner', 6)
    setValue('highRunner', 3)
  }, [])

  const productionScript = trpc.productionPlan.execute.useMutation()

  function calculate (data: ProductionPlanForm) {
    console.log(data)
    productionScript.mutate({
      machinesId: ['1', '2'],
      products: data.products.map(({ demand, stock }, index) => ({
        demand, stock, partNumber: `Produto ${index + 1}`
      })),
      highRunner: data.highRunner,
      lowRunner: data.lowRunner,
      productiveDays: data.productiveDays
    })
  }

  return (
    <Container>

      <FormCase>
        <h2>Planejamento de Produção Semanal</h2>

        <FormProvider {...productionPlanForm}>
          <form onSubmit={handleSubmit(calculate)}>
            <div>
              <Field.Root>
                <Field.Label>Dias Produtivos:</Field.Label>
                <Field.Input name='productiveDays' type='number'/>
                <Field.ErrorMessage field='teste' />
              </Field.Root>
              <Field.Root>
                <Field.Label>Lote mínimo (LR):</Field.Label>
                <Field.Input name='lowRunner' type='number'/>
                <Field.ErrorMessage field='teste' />
              </Field.Root>
              <Field.Root>
                <Field.Label>Lote máximo (HR):</Field.Label>
                <Field.Input name='highRunner' type='number'/>
                <Field.ErrorMessage field='teste' />
              </Field.Root>
              <Button>Calcular</Button>
            </div>

            <span>M15 - 27jph / M16-15jph</span>

            <div>
              {Array(7).fill(1).map((_, index) => (
                <div className='productCase' key={index}>
                  <span>Produto {index + 1}</span>
                  <Field.Root>
                    <Field.Label>Estoque:</Field.Label>
                    <Field.Input name={`products.${index}.stock`} type='number'/>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Demanda:</Field.Label>
                    <Field.Input name={`products.${index}.demand`} type='number'/>
                  </Field.Root>
                </div>
              ))}
            </div>
          </form>
        </FormProvider>

      </FormCase>

      <ScriptTable>
          <Table.Head>
            <th>Máquina</th>
            <th>Produto</th>
            <th>Estoque Inicial</th>
            <th>Demanda Diária</th>
            <th>Estoque Final</th>
            <th>Lote Mínimo</th>
            <th>Tempo Min. de Produção</th>
          </Table.Head>
          <Table.Body>
              {productionScript.data?.map(entry => (
                <tr key={entry.partNumber} >
                  <td>{entry.machineSlug}</td>
                  <td>{entry.partNumber}</td>
                  <td>{entry.initialStock.toFixed(2)} d</td>
                  <td>{entry.dailyDemand.toFixed(0)} p</td>
                  <td>{entry.finalStock.toFixed(2)} d</td>
                  <td>{entry.minLot.toFixed(0)} p</td>
                  <td>{timeInMillisecondsToString(entry.minProductionTime)}</td>
                </tr>
              ))}
          </Table.Body>
      </ScriptTable>

    </Container>
  )
}
