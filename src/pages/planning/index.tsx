import { z } from 'zod'
import { Field } from '../../components/Form/Field'
import { Container, FormCase, MachinesInputsList, ProductInputsList, ProductsLabels, ScriptCase } from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { trpc } from '../../utils/api'
import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '../../components/Form/Botton'

const script = {
  M15: [
    {
      partNumber: '5',
      durationInMilliseconds: 12.592592592592593,
      piorityCoefficient: 0.32,
      quantityToBeProduced: 340
    },
    {
      partNumber: '1',
      durationInMilliseconds: 3.7037037037037037,
      piorityCoefficient: 0.75,
      quantityToBeProduced: 100
    },
    {
      partNumber: '3',
      durationInMilliseconds: 5.555555555555555,
      piorityCoefficient: 0.7692307692307693,
      quantityToBeProduced: 150
    }
  ],
  M16: [
    {
      partNumber: '6',
      durationInMilliseconds: 11.333333333333334,
      piorityCoefficient: 0.22727272727272727,
      quantityToBeProduced: 170
    },
    {
      partNumber: '2',
      durationInMilliseconds: 6.666666666666667,
      piorityCoefficient: 0.5,
      quantityToBeProduced: 100
    }
  ]
}

export function Planning () {
  const productionPlanForm = useForm({
    resolver: zodResolver(z.object({
      teste: z.string()
    }))
  })

  const machines = trpc.machine.get.useQuery()

  return (
    <Container>

      <FormCase>

        <h1>Formulário</h1>

        <FormProvider {...productionPlanForm}>
          <form>

            <header>
              <span>Máquinas</span>
              <button type='button'>Adicionar</button>
            </header>

            <MachinesInputsList>
              <div>
                <Field.Root>
                  <Field.Select
                    name='teste'
                    >
                    {machines.data?.map(({ id, slug }) => (
                      <option key={id} value={id}>{slug}</option>
                    ))}
                  </Field.Select>
                </Field.Root>
                <button type='button'>
                  <TrashIcon/>
                </button>
              </div>

            </MachinesInputsList>

            <header>
              <span>Produtos</span>
              <button type='button'>Adicionar</button>
            </header>

            <ProductsLabels>
              <span>PartNumber</span>
              <span>Estoque</span>
              <span>Demanda</span>
              <span> - </span>
            </ProductsLabels>

            <ProductInputsList>
              <div>

                <Field.Root>
                  <Field.Input name='teste'/>
                </Field.Root>

                <Field.Root>
                  <Field.Input name='teste' type='number'/>
                </Field.Root>

                <Field.Root>
                  <Field.Input name='teste' type='number'/>
                </Field.Root>

                <div>
                  <button type='button'>
                    <TrashIcon/>
                  </button>
                </div>

              </div>
              <div>

                <Field.Root>
                  <Field.Input name='teste'/>
                </Field.Root>

                <Field.Root>
                  <Field.Input name='teste' type='number'/>
                </Field.Root>

                <Field.Root>
                  <Field.Input name='teste' type='number'/>
                </Field.Root>

                <div>
                  <button type='button'>
                    <TrashIcon/>
                  </button>
                </div>

              </div>
            </ProductInputsList>

            <Button>Calcular</Button>

          </form>
        </FormProvider>

      </FormCase>

      <ScriptCase>
        <h1>Planejamento</h1>

        {Object.keys(script).map((key) => (
          <div key={key} >

            <h1>{key}</h1>
            {script[key as keyof typeof script].map(({ partNumber }) => (
              <h2 key={partNumber}>{partNumber}</h2>
            ))}

          </div>
        ))}

      </ScriptCase>

    </Container>
  )
}
