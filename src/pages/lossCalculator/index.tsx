import { z } from 'zod'
import { Container, QuantityLostCase } from './styles'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { Field } from '../../components/Form/Field'
import { Button } from '../../components/Form/Button'
import { trpc, fetch } from '../../utils/api'

const calculatorFormSchema = z.object({
  process: z.string().nonempty('selecione o processo'),
  quantityProduced: z.coerce.number().min(1, 'o campo deve ser > 0'),
  ute: z.string().nonempty('selecione a UTE')
})

type CalulatorForm = z.infer<typeof calculatorFormSchema>

export default function LossCalculator () {
  const calculatorForm = useForm<CalulatorForm>({
    resolver: zodResolver(calculatorFormSchema)
  })

  const {
    handleSubmit,
    watch
  } = calculatorForm

  const [quantityLost, setQuantityLost] = useState('')
  const [target, setTarget] = useState('')

  const handleCalcualte = useCallback(async ({ process, quantityProduced }: CalulatorForm) => {
    const { loss, targetPerHour } = await fetch.oee.calculateLoss.query({
      processId: process, quantityProduced
    })
    setQuantityLost(loss.toString())
    setTarget(targetPerHour.toString())
  }, [])

  const processes = trpc.oee.getProcessesList.useQuery({
    ute: watch('ute') === '' ? undefined : watch('ute')
  })

  return (
    <Container>

      <div>
        <h1>Calculadora de Perdas</h1>

        <FormProvider {...calculatorForm}>
          <form onSubmit={handleSubmit(handleCalcualte)}>

            <Field.Root>
              <Field.Label>Ute:</Field.Label>
              <Field.Select name='ute' >
                <option value="UTE-1">UTE-1</option>
                <option value="UTE-2">UTE-2</option>
                <option value="UTE-3">UTE-3</option>
                <option value="UTE-4">UTE-4</option>
                <option value="UTE-5">UTE-5</option>
              </Field.Select>
              <Field.ErrorMessage field='ute' />
            </Field.Root>

            <Field.Root>
              <Field.Label>Process:</Field.Label>
              <Field.Select name='process' >
                {processes.data?.map(entry => (
                  <option key={entry.id} value={entry.id} >{entry.description}</option>
                ))}
              </Field.Select>
              <Field.ErrorMessage field='process' />
            </Field.Root>

            <Field.Root>
              <Field.Label>Quantidade Produzida:</Field.Label>
              <Field.Input name='quantityProduced' type='number' min={1}/>
              <Field.ErrorMessage field='quantityProduced' />
            </Field.Root>

            <QuantityLostCase>{quantityLost !== '' && <>
              Meta: {target} p/hora <br />
              {quantityLost} min de perda

            </>}</QuantityLostCase>

            <Button type='submit' >Calcular</Button>

          </form>
        </FormProvider>
      </div>

    </Container>
  )
}
