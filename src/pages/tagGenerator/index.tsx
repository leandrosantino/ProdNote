import { Container, Separator, Info, DownloadError } from './styles'
import { Field } from '../../components/Form/Field'
import { Button } from '../../components/Form/Botton'
import { PlusCircledIcon, TrashIcon, DownloadIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Combobox } from '../../components/Form/Combobox'
import { useEffect, useState } from 'react'
import { Table } from '../../components/Table'
import { Switch } from '../../components/Form/Switch'
import { z } from 'zod'
import { trpc } from '../../utils/api'
import fileDownload from 'js-file-download'

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
  'Carpete moldado esquedo': { id: '1' },
  'Bloco Hood 552': { id: '2' }
}

const addProductsFormSchema = z.object({
  product: z.string()
    .nonempty('O campo é obrigatório')
    .refine(value => options[value] !== undefined, 'Produto desconhecido'),
  amount: z.coerce.number()
    .min(1, '0 - 10')
    .max(10, '0 - 10'),
  fractional: z.coerce.boolean()
})

type AddProductsFormData = z.infer<typeof addProductsFormSchema>

export function TagGenerator () {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>([])
  const [pagesAmount, setPagesAmount] = useState(0)
  const [downloadError, setDownloadError] = useState(false)
  const tagsDownloadQuery = trpc.tag.createcreateTags.useMutation({})

  useEffect(() => {
    setDownloadError(false)
  }, [selectedProducts])

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

  function handleRemoveProduct (product: SelectedProducts, productIndex: number) {
    setSelectedProducts(oldeState => oldeState.filter((_, index) => index !== productIndex))
    setPagesAmount(oldState => oldState - product.amount)
  }

  async function handleDownloadTagsInPDF () {
    if (selectedProducts.length > 0) {
      tagsDownloadQuery.mutateAsync(selectedProducts)
        .then((buffer) => {
          const file = new Blob([new Uint8Array(buffer.data).buffer], {
            type: 'application/pdf'
          })
          fileDownload(file, 'teste.pdf')
          window.open(window.URL.createObjectURL(file), '_blank')
          setSelectedProducts([])
        })
        .catch(console.log)
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
            {selectedProducts?.map((product, index) => (
              <tr key={index} data-fractional={product.isFractional ? 'yes' : 'no'}>
                <td>{product.name}</td>
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
                  <button onClick={() => { handleRemoveProduct(product, index) }}>
                    <TrashIcon/>
                  </button>
                </td>
              </tr>
            ))}
          </Table.Body>
        </Table.Root>

        <Info>
          <span>{pagesAmount} páginas</span>
          <span>{tagsDownloadQuery.isLoading ? 'baixando...' : ''}</span>
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
