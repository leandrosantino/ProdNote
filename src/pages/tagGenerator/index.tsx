import { Container } from './styles'
import { Field } from '../../components/Form/Field'
import { Button } from '../../components/Form/Botton'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Combobox } from '../../components/Form/Combobox'

type Options = Record<string, {
  id: string
}>

const options: Options = {
  'Carpet frontal headline 592/551': { id: '1' },
  'Teto moldado 226': { id: '2' },
  'Bloco hood 551': { id: '3' },
  'Bloco hood 5512': { id: '3' },
  'Bloco hood 5513': { id: '3' },
  'Bloco hood 5514': { id: '3' },
  'Bloco hood 5515': { id: '3' },
  'Bloco hood 5516': { id: '3' },
  'Bloco hood 5517': { id: '3' },
  'Bloco hood 5518': { id: '3' }
}

const addProductsFormSchema = z.object({
  amount: z.coerce.number()
    .min(1, '0 - 10')
    .max(10, '0 - 10'),
  product: z.string()
    .refine(value => options[value] !== undefined, 'Produto desconhecido')
    .transform(value => {
      return { name: value, id: options[value].id }
    })
})

type AddProductsFormData = z.infer<typeof addProductsFormSchema>

export function TagGenerator () {
  const addProductsForm = useForm<AddProductsFormData>({
    resolver: zodResolver(addProductsFormSchema)
  })
  const {
    handleSubmit
  } = addProductsForm

  function handleAddProduct (data: AddProductsFormData) {
    console.log(data)
  }

  return (
    <Container>

      <section className='a'>
          <FormProvider {...addProductsForm}>
            <form onSubmit={handleSubmit(handleAddProduct)} >

                <Field.Root className='productField'>
                  <Field.Label>Produto:</Field.Label>
                  <Combobox
                    name='product'
                    options={Object.keys(options)}
                    placeholder='Insira o nome do produto que deseja adicionar'
                  />
                  <Field.ErrorMessage field='product' />
                </Field.Root>

                <Field.Root className='amountField'>
                  <Field.Label htmlFor='amount' >Quant.</Field.Label>
                  <Field.Input min={1} type='number' name='amount' />
                  <Field.ErrorMessage field='amount'/>
                </Field.Root>

                <Button type='submit'>
                  adicionar
                  <PlusCircledIcon/>
                </Button>

            </form>
          </FormProvider>
      </section>

      <section>

      </section>

    </Container>
  )
}

/**
 *
 *
  *
 *

          <Field.Root message='teste' isValid={false} className='amountField'>
            <Field.Label>Quant.</Field.Label>
            <Field.Control>
              <input type="number" />
            </Field.Control>
          </Field.Root>
*/
