import { Container, Separator, Info, DownloadError } from './styles'
import { Field } from '../../components/Form/Field'
import { Button } from '../../components/Form/Botton'
import { PlusCircledIcon, TrashIcon, DownloadIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Combobox } from '../../components/Form/Combobox'
import { useEffect, useState } from 'react'
import { Table } from '../../components/Table'
import { Switch } from '../../components/Form/Switch'

type Options = Record<string, {
  id: string
}>

interface SelectedProducts {
  name: string
  id: string
  amount: number
  isFractional: boolean
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
  const [downloadError, setDownloadError] = useState(false)

  useEffect(() => {
    setDownloadError(false)
  }, [selectedProducts])

  const addProductsFormSchema = z.object({
    product: z.string()
      .nonempty('O campo é obrigatório')
      .refine(value => options[value] !== undefined, 'Produto desconhecido')
      .refine(
        value => (selectedProducts.filter(product => product.name === value)).length === 0,
        'Este produto já foi adicionado'
      ),
    amount: z.coerce.number()
      .min(1, '0 - 10')
      .max(10, '0 - 10'),
    fractional: z.coerce.boolean()
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
    console.log(data)
    setSelectedProducts(oldState => [...oldState, {
      amount: data.amount,
      id: options[data.product].id,
      name: data.product,
      isFractional: data.fractional
    }])
    setValue('amount', 1)
    setValue('fractional', false)
    resetField('product')
    setPagesAmount(oldState => oldState + data.amount)
  }

  function handleRemoveProduct (product: SelectedProducts) {
    setSelectedProducts(oldeState => oldeState.filter(entry => entry.id !== product.id))
    setPagesAmount(oldState => oldState - product.amount)
  }

  function handleDownloadTagsInPDF () {
    if (selectedProducts.length > 0) {
      setSelectedProducts([])
      alert('Baixando PDF...')
      return
    }
    setDownloadError(true)
  }

  return (
    <Container>

      <section className='a'>

        <h3>Gerar Etiquetas</h3>

        <FormProvider {...addProductsForm}>
          <form onSubmit={handleSubmit(handleAddProduct)} >

            <Field.Root className='productField'>
              <Field.Label htmlFor='product' >Produto:</Field.Label>
              <Combobox
                id='product'
                name='product'
                options={Object.keys(options)}
                placeholder='Insira o nome do produto que deseja adicionar'
              />
              <Field.ErrorMessage field='product' />
            </Field.Root>

            <div>
              <div>
                <Field.Root className='amountField'>
                  <Field.Label htmlFor='amount' >Quant.:</Field.Label>
                  <Field.Input
                    id='amount'
                    min={1} max={10}
                    type='number' name='amount'
                    placeholder='0-10'
                  />
                  <Field.ErrorMessage field='amount'/>
                </Field.Root>
                <div>
                  <label htmlFor="fractional">Fracionada: </label>
                  <Switch name='fractional' />
                </div>
              </div>

              <Button type='submit'>
                Adicionar
                <PlusCircledIcon/>
              </Button>

            </div>

          </form>
        </FormProvider>

        <Separator/>

        {downloadError &&
          <DownloadError>Adicione ao menos 1 produto para continuar</DownloadError>
        }

        <Table.Root>
          <Table.Head>
            <th>Produto</th>
            <th>Frac.</th>
            <th>Quant.</th>
            <th></th>
          </Table.Head>
          <Table.Body>
            {selectedProducts?.map(product => (
              <tr key={product.id} data-fractional={product.isFractional ? 'yes' : 'no'}>
                <td>{product.name} caiuscgasoiucgas casuigc aoiusc gasoiu casuiucag scio</td>
                <td
                  className='tableFractionalTag'
                  data-fractional={product.isFractional ? 'yes' : 'no'}
                >{
                  product.isFractional
                    ? <CheckCircledIcon/>
                    : <CrossCircledIcon/>
                }</td>
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
          <Button
            onClick={handleDownloadTagsInPDF}
          >
            Baixar
            <DownloadIcon/>
          </Button>
        </Info>

      </section>
      <section>
        <div></div>
      </section>

    </Container>
  )
}
