import { z } from 'zod'
import { Container, QuantityLostCase } from './styles'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { Field } from '../../components/Form/Field'
import { Button } from '../../components/Form/Button'

const calculatorFormSchema = z.object({
  process: z.string().nonempty(),
  quantityProduced: z.coerce.number().min(1)
})

type CalulatorForm = z.infer<typeof calculatorFormSchema>

export default function LossCalculator () {
  const calculatorForm = useForm<CalulatorForm>({
    resolver: zodResolver(calculatorFormSchema)
  })

  const {
    handleSubmit
  } = calculatorForm

  const [quantityLost, setQuantityLost] = useState('')

  const handleCalcualte = useCallback((data: CalulatorForm) => {
    console.log(data)
    setQuantityLost((data.quantityProduced + 1).toString())
  }, [])

  return (
    <Container>

      <h1>Calculadora de Perdas</h1>

      <FormProvider {...calculatorForm}>
        <form onSubmit={handleSubmit(handleCalcualte)}>

          <Field.Root>
            <Field.Label>Process:</Field.Label>
            <Field.Select name='process' >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Field.Select>
            <Field.ErrorMessage field='process' />
          </Field.Root>

          <Field.Root>
            <Field.Label>Quantidade Produzida:</Field.Label>
            <Field.Input name='quantityProduced' type='number' min={1}/>
            <Field.ErrorMessage field='quantityProduced' />
          </Field.Root>

          <QuantityLostCase>{quantityLost} min de perda</QuantityLostCase>

          <Button type='submit' >Calcular</Button>

        </form>
      </FormProvider>

    </Container>
  )
}
