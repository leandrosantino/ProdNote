import { Container, Separator, Info } from './styles'
import { Field } from '../../components/Form/Field'
import { Button } from '../../components/Form/Botton'
import { PlusCircledIcon, TrashIcon, DownloadIcon } from '@radix-ui/react-icons'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Combobox } from '../../components/Form/Combobox'
import { useState } from 'react'
import { Table } from '../../components/Table'

type Options = Record<string, {
  id: string
}>

interface SelectedProducts {
  name: string
  id: string
  amount: number
}

const options: Options = {
  'Carpet frontal headline 592/551': { id: '1' },
  'Teto moldado 226': { id: '2' },
  'Bloco hood 551': { id: '3' },
  'Bloco hood 5512': { id: '4' },
  'Bloco hood 5513': { id: '5' },
  'Bloco hood 5514': { id: '6' },
  'Bloco hood 5515': { id: '7' },
  'Bloco hood 5516': { id: '8' },
  'Bloco hood 5517': { id: '9' },
  'Bloco hood 5518': { id: '10' }
}

export function TagGenerator () {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>([])
  const [pagesAmount, setPagesAmount] = useState(0)

  const addProductsFormSchema = z.object({
    amount: z.coerce.number()
      .min(1, '0 - 10')
      .max(10, '0 - 10'),
    product: z.string()
      .refine(value => options[value] !== undefined, 'Produto desconhecido')
      .refine(
        value => (selectedProducts.filter(product => product.name === value)).length === 0,
        'Este produto já foi adicionado'
      )
  })

  type AddProductsFormData = z.infer<typeof addProductsFormSchema>

  const addProductsForm = useForm<AddProductsFormData>({
    resolver: zodResolver(addProductsFormSchema)
  })
  const {
    handleSubmit,
    resetField,
    setValue
  } = addProductsForm

  function handleAddProduct (data: AddProductsFormData) {
    setSelectedProducts(oldState => [...oldState, {
      amount: data.amount,
      id: options[data.product].id,
      name: data.product
    }])
    setValue('amount', 1)
    resetField('product')
    setPagesAmount(oldState => oldState + data.amount)
  }

  function handleRemoveProduct (product: SelectedProducts) {
    setSelectedProducts(oldeState => oldeState.filter(entry => entry.id !== product.id))
    setPagesAmount(oldState => oldState - product.amount)
  }

  return (
    <Container>

      <section className='a'>

        <h3>Gerar Etiquetas</h3>

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
                <Field.Label htmlFor='amount' >Quant.:</Field.Label>
                <Field.Input min={1} max={10} type='number' name='amount' />
                <Field.ErrorMessage field='amount'/>
              </Field.Root>

              <Button type='submit'>
                adicionar
                <PlusCircledIcon/>
              </Button>

          </form>
        </FormProvider>

        <Separator/>

        <Table.Root>
          <Table.Head>
            <th>Produto</th>
            <th>Quant.</th>
            <th></th>
          </Table.Head>
          <Table.Body>
            {selectedProducts?.map(product => (
              <tr key={product.id} >
                <td>{product.name}</td>
                <td>{product.amount}</td>
                <td>
                  <button onClick={() => { handleRemoveProduct(product) }}>
                    <TrashIcon/>
                  </button>
                </td>
              </tr>
            ))}
          </Table.Body>
        </Table.Root>

        <Info>
          <span>{pagesAmount} páginas</span>
          <Button>
            Baixar
            <DownloadIcon/>
          </Button>
        </Info>

      </section>

      <section>

      </section>

    </Container>
  )
}
