import { Container, Separator, Info, DownloadError, SpinnerCase, TagSection, SelectedProductsTable } from './styles'
import { Field } from '../../components/Form/Field'
import { Button } from '../../components/Form/Button'
import { PlusCircledIcon, TrashIcon, DownloadIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Combobox } from '../../components/Form/Combobox'
import { useEffect, useState } from 'react'
import { Table } from '../../components/Table'
import { Switch } from '../../components/Form/Switch'
import { z } from 'zod'
import { trpc } from '../../utils/api'
import { ImSpinner6 } from 'react-icons/im'
import { TagSheet } from '../../components/TagSheet'
import { type Product } from '../../../server/entities/Product'

interface SelectedProducts {
  name: string
  id: string
  amount: number
  isFractional: boolean
}

const PAGE_AMOUNT_LIMIT = 100

export function TagGenerator () {
  const { data: products, isLoading: productsLoading } = trpc.product.getAll.useQuery()

  const addProductsFormSchema = z.object({
    product: z.string()
      .nonempty('O campo é obrigatório')
      .refine(value => {
        if (products) {
          return products
            .filter(entry => entry.description === value)
            .map(entry => entry.description)
            .includes(value)
        }
        return false
      }, 'Produto desconhecido'),

    amount: z.coerce.number()
      .min(1, `1 - ${PAGE_AMOUNT_LIMIT}`)
      .max(PAGE_AMOUNT_LIMIT, `1 - ${PAGE_AMOUNT_LIMIT}`),

    fractional: z.coerce.boolean(),
    id: z.string()

  }).transform(form => {
    if (products) {
      form.id = products.filter(entry => entry.description === form.product)[0].id as string
    }
    return form
  })

  type AddProductsFormData = z.infer<typeof addProductsFormSchema>

  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>([])
  const [pagesAmount, setPagesAmount] = useState(0)
  const [downloadStatus, setDownloadStatus] = useState({
    error: false,
    msg: ''
  })

  const [viewProduct, setViewProduct] = useState<{
    data: Product
    isFractional: boolean
  }>()

  const tagsDownloadQuery = trpc.tag.create.useMutation({})

  const addProductsForm = useForm<AddProductsFormData>({
    resolver: zodResolver(addProductsFormSchema)
  })

  const {
    handleSubmit,
    resetField,
    setValue
  } = addProductsForm

  useEffect(() => {
    setDownloadStatus({
      error: false, msg: ''
    })
    setValue('id', '')
    handleSetViewProduct(selectedProducts.length - 1)
  }, [selectedProducts])

  function handleAddProduct (data: AddProductsFormData) {
    console.log(data)
    setSelectedProducts(oldState => [...oldState, {
      amount: data.amount,
      id: data.id,
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
    setViewProduct(undefined)
  }

  async function handleDownloadTagsInPDF () {
    if (selectedProducts.length === 0) {
      setDownloadStatus({
        error: true,
        msg: 'Adicione ao menos 1 produto para continuar'
      })
      return
    }

    if (pagesAmount > PAGE_AMOUNT_LIMIT) {
      setDownloadStatus({
        error: true,
        msg: 'Limite de paginas excedido'
      })
      return
    }

    tagsDownloadQuery.mutateAsync(selectedProducts)
      .then((buffer) => {
        const file = new Blob([new Uint8Array(buffer.data).buffer], {
          type: 'application/pdf'
        })
        // fileDownload(file, 'teste.pdf')
        window.open(window.URL.createObjectURL(file), '_blank')
        setSelectedProducts([])
        setPagesAmount(0)
      })
      .catch(console.log)
  }

  function handleSetViewProduct (index: number) {
    if (products && selectedProducts.length > 0) {
      setViewProduct({
        data: products.filter(
          ({ description }) => description === selectedProducts[index].name
        )[0],
        isFractional: selectedProducts[index].isFractional
      })
    }
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
                autoComplete='off'
                disabled={productsLoading}
                id='product'
                name='product'
                options={products?.map(entry => entry.description) ?? []}
                placeholder={productsLoading ? 'Carregando...' : 'Insira o nome do produto que deseja adicionar'}
              />
              <Field.ErrorMessage field='product' />
            </Field.Root>

            <div>
              <div>
                <Field.Root className='amountField'>
                  <Field.Label htmlFor='amount' >Quant.:</Field.Label>
                  <Field.Input
                    id='amount'
                    min={1}
                    type='number' name='amount'
                    placeholder={`1 - ${PAGE_AMOUNT_LIMIT}`}
                  />
                  <Field.ErrorMessage field='amount'/>
                </Field.Root>
                <div>
                  <label htmlFor="fractional">Fracionada: </label>
                  <Switch name='fractional' />
                </div>
              </div>

              <Button type='submit' disabled={tagsDownloadQuery.isLoading}>
                Adicionar
                <PlusCircledIcon/>
              </Button>

            </div>

          </form>
        </FormProvider>

        <Separator/>

        {downloadStatus.error &&
          <DownloadError>{downloadStatus.msg}</DownloadError>
        }

        <SelectedProductsTable>
          <Table.Head>
            <th>Produto</th>
            <th>Frac.</th>
            <th>Quant.</th>
            <th></th>
          </Table.Head>
          <Table.Body>
            {selectedProducts?.map((product, index) => (
              <tr
                key={index} data-fractional={product.isFractional ? 'yes' : 'no'}
                >
                <td
                  onClick={() => { handleSetViewProduct(index) }}
                >{product.name}</td>
                <td
                  onClick={() => { handleSetViewProduct(index) }}
                  className='tableFractionalTag'
                  data-fractional={product.isFractional ? 'yes' : 'no'}
                >{
                  product.isFractional
                    ? <CheckCircledIcon/>
                    : <CrossCircledIcon/>
                }</td>
                <td
                  onClick={() => { handleSetViewProduct(index) }}
                >{product.amount}</td>
                <td>
                  <button
                    disabled={tagsDownloadQuery.isLoading}
                    onClick={() => { handleRemoveProduct(product, index) }}>
                    <TrashIcon/>
                  </button>
                </td>
              </tr>
            ))}
          </Table.Body>
        </SelectedProductsTable>

        <Info>
          <span>{pagesAmount}-{PAGE_AMOUNT_LIMIT} páginas</span>
          {tagsDownloadQuery.isLoading && <SpinnerCase>
            <ImSpinner6 size={20}/>
             Preparando arquivos...
          </SpinnerCase>}
          <Button
            onClick={handleDownloadTagsInPDF}
            disabled={tagsDownloadQuery.isLoading}
          >
            Baixar
            <DownloadIcon/>
          </Button>
        </Info>

      </section>

      <TagSection>
        {viewProduct &&
          <TagSheet scale='reduce' productInfo={viewProduct} />
        }
      </TagSection>

    </Container>
  )
}
