import { z } from 'zod'
import { Field } from '../../components/Form/Field'
import { Container, RecordsTable } from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../components/Form/Button'
import { Pencil, Save, TrashIcon } from 'lucide-react'
import { Table } from '../../components/Table'

const registerOEEFormSchema = z.object({
  date: z.string(),
  time: z.coerce.number().min(1),
  turn: z.enum(['1', '2', '3'] as const),
  ute: z.enum(['UTE-1', 'UTE-2', 'UTE-3', 'UTE-4', 'UTE-5'] as const),
  piecesQuantity: z.coerce.number().min(1),
  process: z.string()
})

type RegisterOEEForm = z.infer<typeof registerOEEFormSchema>

export function RegisterOEE () {
  const registerOEEForm = useForm<RegisterOEEForm>({
    resolver: zodResolver(registerOEEFormSchema)
  })

  const {
    handleSubmit
  } = registerOEEForm

  return (
    <Container>
      <div>
        <h1>Lançamento de OEE</h1>

        <FormProvider {...registerOEEForm}>
          <form onSubmit={handleSubmit(() => { console.log('ok') })}>
            <div>
              <Field.Root>
                <Field.Label htmlFor='date'>Data:</Field.Label>
                <Field.Input id='date' name='date' type='date' />
                <Field.ErrorMessage field='date'/>
              </Field.Root>

              <Field.Root>
                <Field.Label htmlFor='turn'>Turno:</Field.Label>
                <Field.Select id='turn' name='turn' >
                  <option value="1">1º truno</option>
                  <option value="2">2º truno</option>
                  <option value="3">3º truno</option>
                </Field.Select>
                <Field.ErrorMessage field='turn'/>
              </Field.Root>

              <Field.Root>
                <Field.Label htmlFor='ute'>UTE:</Field.Label>
                <Field.Select id='ute' name='ute' >
                  <option value="UTE-1">UTE-1</option>
                  <option value="UTE-2">UTE-2</option>
                  <option value="UTE-3">UTE-3</option>
                  <option value="UTE-4">UTE-4</option>
                  <option value="UTE-5">UTE-5</option>
                </Field.Select>
                <Field.ErrorMessage field='ute'/>
              </Field.Root>
            </div>

            <div>
              <Field.Root id='processInputCase'>
                <Field.Label htmlFor='process'>Processo:</Field.Label>
                <Field.Select id='process' name='process' >
                  <option value="hgswrehwer">Moldagem</option>
                </Field.Select>
                <Field.ErrorMessage field='process'/>
              </Field.Root>

              <Field.Root>
                <Field.Label htmlFor='time'>Tempo de Produção:</Field.Label>
                <Field.Input id='time' name='time' type='number' />
                <Field.ErrorMessage field='time'/>
              </Field.Root>

              <Field.Root>
                <Field.Label htmlFor='piecesQuantity'>Quantidade de Peças Boas:</Field.Label>
                <Field.Input id='piecesQuantity' name='piecesQuantity' type='number' />
                <Field.ErrorMessage field='piecesQuantity'/>
              </Field.Root>

              <Button type='submit' >
                <Save size={18} />
                Registrar
              </Button>
            </div>

          </form>
        </FormProvider>

      <RecordsTable>
        <Table.Head>
          <th>Data</th>
          <th>Processo</th>
          <th>OEE</th>
          <th>UTE</th>
          <th>Turno</th>
          <th>  </th>
          <th>  </th>
          <th>  </th>
        </Table.Head>
        <Table.Body>
          <tr>
            <td>21/02/2023</td>
            <td>Moldagem do tunuel(M32, M32)</td>
            <td>70%</td>
            <td>UTE-1</td>
            <td>1º Turno</td>
            <td>
              <button>Alterar Perdas</button>
            </td>
            <td>
              <button><Pencil size={15}/></button>
            </td>
            <td>
              <button><TrashIcon size={13} /></button>
            </td>
          </tr>
          <tr>
            <td>21/02/2023</td>
            <td>Moldagem do tunuel(M32, M32)</td>
            <td>70%</td>
            <td>UTE-1</td>
            <td>1º Turno</td>
            <td>
              <button>Alterar Perdas</button>
            </td>
            <td>
              <button><Pencil size={15}/></button>
            </td>
            <td>
              <button><TrashIcon size={13} /></button>
            </td>
          </tr>
          <tr>
            <td>21/02/2023</td>
            <td>Moldagem do tunuel(M32, M32)</td>
            <td>70%</td>
            <td>UTE-1</td>
            <td>1º Turno</td>
            <td>
              <button>Alterar Perdas</button>
            </td>
            <td>
              <button><Pencil size={15}/></button>
            </td>
            <td>
              <button><TrashIcon size={13} /></button>
            </td>
          </tr>
          <tr>
            <td>21/02/2023</td>
            <td>Moldagem do tunuel(M32, M32)</td>
            <td>70%</td>
            <td>UTE-1</td>
            <td>1º Turno</td>
            <td>
              <button>Alterar Perdas</button>
            </td>
            <td>
              <button><Pencil size={15}/></button>
            </td>
            <td>
              <button><TrashIcon size={13} /></button>
            </td>
          </tr>
        </Table.Body>
      </RecordsTable>

      </div>
    </Container>
  )
}
