import { z } from 'zod'
import { Field } from '../../components/Form/Field'
import { Container, FormCase, MachineInfo, MachinesInputsList, ProductInfo, ProductInputsList, ProductsLabels, ScriptCase } from './styles'
import { FormProvider, useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { trpc } from '../../utils/api'
import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '../../components/Form/Button'

export function Planning () {
  const productionPlanFormSchema = z.object({
    products: z.array(z.object({
      partNumber: z.string().nonempty('campo vazio'),
      stock: z.coerce.number().min(1, '>=1'),
      demand: z.coerce.number().min(1, '>=1')
    }))
      .min(2, 'Adicione no mínimo 2 produto')
      .superRefine((val, ctx) => {
        const partNumbers = val.map(entry => entry.partNumber)
        if (partNumbers.length !== new Set(partNumbers).size) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Não pode existir partNumbers repetidos'
          })
        }
      }),
    machines: z.array(z.object({ value: z.string().nonempty('selecione uma máquina') }))
      .min(1, 'Adicione no mínimo 1 máquina')
      .superRefine((val, ctx) => {
        const machines = val.map(entry => entry.value)
        if (machines.length !== new Set(machines).size) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Selecione máquinas diferentes '
          })
        }
      })
  })

  type ProductionPlanForm = z.infer<typeof productionPlanFormSchema>

  const productionPlanForm = useForm<ProductionPlanForm>({
    resolver: zodResolver(productionPlanFormSchema)
  })

  const { handleSubmit, formState: { errors } } = productionPlanForm

  const productsFieldArray = useFieldArray({
    control: productionPlanForm.control,
    name: 'products'
  })

  const machinesFieldArray = useFieldArray({
    control: productionPlanForm.control,
    name: 'machines'
  })

  const machines = trpc.machine.getAll.useQuery()
  const productionScript = trpc.productionPlan.execute.useMutation()

  function timeInMillisecondsToString (milliseconds: number) {
    console.log(milliseconds)
    const timeInFloatHours = milliseconds / 1000 / 60 / 60
    const hours = parseInt(timeInFloatHours.toString())
    const minutes = parseInt(((timeInFloatHours * 60) % 60).toString())
    return `${hours}:${minutes}h`
  }

  function calculate (data: ProductionPlanForm) {
    console.log(data)
    productionScript.mutate({
      machinesId: data.machines.map(machine => machine.value),
      products: data.products,
      highRunner: 3,
      lowRunner: 6,
      productiveDays: 6
    })
  }

  return (
    <Container>

      <FormCase>

        <h1>Formulário</h1>

        <FormProvider {...productionPlanForm}>
          <form onSubmit={handleSubmit(calculate)}>

            <header>
              <span>Máquinas</span>
              <button type='button'
                onClick={() => {
                  if (machinesFieldArray.fields.length < 2) {
                    machinesFieldArray.append({ value: '' })
                  }
                }}
              >Adicionar</button>
            </header>

            <MachinesInputsList>
              {machinesFieldArray.fields.map((field, index) => (
                <div key={field.id} >
                  <Field.Root>
                    <Field.Select
                      name={`machines.${index}.value`}
                      >
                      {machines.data?.map(({ id, slug }) => (
                        <option key={id} value={id}>{slug}</option>
                      ))}
                    </Field.Select>
                    <Field.ErrorMessage field={`machines.${index}.value`}/>
                  </Field.Root>
                  <button type='button' onClick={() => { machinesFieldArray.remove(index) }}>
                    <TrashIcon/>
                  </button>
                </div>
              ))}

            </MachinesInputsList>

            <span>{errors.machines?.message}</span>

            <header>
              <span>Produtos</span>
              <button type='button' onClick={() => {
                productsFieldArray.append({
                  demand: 0, partNumber: '', stock: 0
                })
              }}>Adicionar</button>
            </header>

            <ProductsLabels>
              <span>PartNumber</span>
              <span>Estoque</span>
              <span>Demanda</span>
              <span> - </span>
            </ProductsLabels>

            <ProductInputsList>

              {productsFieldArray.fields.map((field, index) => (
                <div key={field.id}>

                  <Field.Root>
                    <Field.Input name={`products.${index}.partNumber`}/>
                    <Field.ErrorMessage field={`products.${index}.partNumber`}/>
                  </Field.Root>

                  <Field.Root>
                    <Field.Input name={`products.${index}.stock`} type='number'/>
                    <Field.ErrorMessage field={`products.${index}.stock`}/>
                  </Field.Root>

                  <Field.Root>
                    <Field.Input name={`products.${index}.demand`} type='number'/>
                    <Field.ErrorMessage field={`products.${index}.demand`}/>
                  </Field.Root>

                  <div>
                    <button type='button' onClick={() => { productsFieldArray.remove(index) }}>
                      <TrashIcon/>
                    </button>
                  </div>

                </div>
              ))}

            </ProductInputsList>

            <span>{errors.products?.message}</span>

            <Button>Calcular</Button>

          </form>
        </FormProvider>

      </FormCase>

      <ScriptCase>
        <h1>Planejamento</h1>

        <article>
          <ul>
            {/* {Object.keys(productionScript.data ? productionScript.data : {}).map((key) => (
              <MachineInfo key={key} >

                {key} - capacidade: {machines.data?.filter(entry => entry.slug === key)[0].capacity}jph
                <ul>
                  {productionScript?.data?.[key].map((info) => (
                    <ProductInfo key={info?.partNumber}>
                      {`
                        PN: ${info?.partNumber} =>
                        (${info?.quantityToBeProduced} Peças) -
                        tempo: ${timeInMillisecondsToString(info?.durationInMilliseconds)} -
                        prioridade: ${info?.piorityCoefficient.toFixed(2)}
                      `}
                    </ProductInfo>
                  ))}
                </ul>

              </MachineInfo>
            ))} */}
          </ul>
        </article>

      </ScriptCase>

    </Container>
  )
}
