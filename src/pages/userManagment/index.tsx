import { z } from 'zod'
import { Container, Content, UserTable } from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field } from '../../components/Form/Field'
import { Button } from '../../components/Form/Button'
import { Save, Pencil, Trash } from 'lucide-react'
import { Table } from '../../components/Table'

const permissions = [
  'ADMIN',
  'PROD'
] as const

const userFormSchema = z.object({
  name: z.string().nonempty(),
  password: z.string().nonempty(),
  email: z.string().email(),
  permission: z.enum(permissions)
})

type UserFormType = z.infer<typeof userFormSchema>

export function UserManagement () {
  const userForm = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema)
  })

  const {
    handleSubmit
  } = userForm

  function handleSave (data: UserFormType) {
    console.log(data)
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciar Usuários</h1>
        <FormProvider {...userForm}>
          <form onSubmit={handleSubmit(handleSave)}>
            <div>
              <Field.Root>
                <Field.Label htmlFor='name' >Name:</Field.Label>
                <Field.Input
                  name='name'
                  id='name'
                />
                <Field.ErrorMessage field='name' />
              </Field.Root>
              <Field.Root>
                <Field.Label htmlFor='password' >Password:</Field.Label>
                <Field.Input
                  autoComplete='off'
                  name='password'
                  id='password'
                  type='password'
                />
                <Field.ErrorMessage field='password' />
              </Field.Root>
            </div>
            <div>

              <Field.Root>
                <Field.Label htmlFor='email' >Email:</Field.Label>
                <Field.Input
                  autoComplete='off'
                  name='email'
                  id='email'
                  type='email'
                />
                <Field.ErrorMessage field='email' />
              </Field.Root>
              <Field.Root>
                <Field.Label htmlFor='permission' >Permissão:</Field.Label>
                <Field.Select
                  name='permission'
                  id='permission'
                >
                  <option value="ADMIN">Administrador</option>
                  <option value="ADMIN">Produção</option>
                </Field.Select>
                <Field.ErrorMessage field='permission' />
              </Field.Root>

              <Button> <Save size={15} /> Salvar </Button>

            </div>
          </form>
        </FormProvider>

        <UserTable>
          <Table.Head>
            <th>Nome</th>
            <th>Email</th>
            <th>Permissão</th>
            <th></th>
            <th></th>
          </Table.Head>
          <Table.Body>
            {new Array(20).fill('').map((_, index) => (
              <tr key={index}>
                <td>oeeute5</td>
                <td>alder4@email.com</td>
                <td>Produção</td>
                <td>
                    <button> <Pencil size={15} /> </button>
                  </td>
                  <td>
                    <button> <Trash size={15} /> </button>
                  </td>
              </tr>
            ))}
          </Table.Body>
        </UserTable>

      </Content>
    </Container>
  )
}
