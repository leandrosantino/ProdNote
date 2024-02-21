import { z } from 'zod'
import { Container, Content, UserTable } from './styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field } from '../../components/Form/Field'
import { Button } from '../../components/Form/Button'
import { Save, Pencil } from 'lucide-react'
import { Table } from '../../components/Table'
import { fetch, trpc } from '../../utils/api'
import { useEffect, useState } from 'react'
import { useDialog } from '../../hooks/useDialog'

const permissions = [
  'ADMIN',
  'PROD'
] as const

const userFormSchema = z.object({
  name: z.string().nonempty('campo obrigatório'),
  password: z.string(),
  email: z.string().email('email inválido'),
  permission: z.enum(permissions, {
    errorMap: () => ({ message: 'Informe a permissão do usuário' })
  })
})

type UserFormType = z.infer<typeof userFormSchema>

interface UserData {
  id?: string | undefined
  name: string
  email: string
  password: string
  permissions: Array<'GENERATE_TAGS' | 'READ_TAGS' | 'PLANNING' | 'CREATE_USERS' | 'OEE_NOTE' | 'OEE_ADMIN' | 'ROOT'>
}

export function UserManagement () {
  const dialog = useDialog()

  const userForm = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema)
  })

  const {
    handleSubmit,
    setValue
  } = userForm

  const users = trpc.user.getAll.useQuery()

  const [selectedUser, setSelectedUser] = useState<UserData>()

  const getUserRole = (permissions: UserData['permissions']) => permissions.includes('OEE_ADMIN') ? 'ADMIN' : 'PROD'

  useEffect(() => {
    if (selectedUser) {
      setValue('email', selectedUser.email)
      setValue('name', selectedUser.name)
      setValue('password', '')
      setValue('permission', getUserRole(selectedUser.permissions))
      return
    }
    setValue('email', '')
    setValue('name', '')
    setValue('password', '')
    setValue('permission', '' as typeof permissions[number])
  }, [selectedUser])

  function handleSave (data: UserFormType) {
    dialog.question({
      title: 'Atenção!!!',
      message: 'Realmente deseja salvar as alterações?',
      async accept () {
        if (selectedUser) { await handleEdit(data) } else { await handleCreate(data) }
        await users.refetch()
      },
      refuse () {}
    })
  }

  async function handleCreate (user: UserFormType) {
    if (user.password === '') {
      dialog.alert({
        title: 'Atenção!!',
        message: 'Informe a senha para continuar',
        error: true
      })
      return
    }
    await fetch.user.create.mutate({
      email: user.email,
      name: user.name,
      password: user.password,
      permissions: user.permission === 'ADMIN' ? ['OEE_ADMIN', 'OEE_NOTE'] : ['OEE_NOTE']
    })
    dialog.alert({
      title: 'Sucesso!!!',
      message: 'Novo usuário criado!'
    })
  }
  async function handleEdit (user: UserFormType) {
    await fetch.user.update.mutate({
      id: selectedUser?.id as string,
      data: {
        email: user.email,
        name: user.name,
        password: user.password === '' ? (selectedUser?.password as string) : user.password,
        permissions: user.permission === 'ADMIN' ? ['OEE_ADMIN', 'OEE_NOTE'] : ['OEE_NOTE']
      }
    })
    setSelectedUser(undefined)
    dialog.alert({
      title: 'Sucesso!!!',
      message: 'Novo usuário criado!'
    })
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
                />
                <Field.ErrorMessage field='email' />
              </Field.Root>
              <Field.Root>
                <Field.Label htmlFor='permission' >Permissão:</Field.Label>
                <Field.Select
                  name='permission'
                  id='permission'
                >
                  <option value="">----</option>
                  <option value="ADMIN">Administrador</option>
                  <option value="PROD">Produção</option>
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
          </Table.Head>
          <Table.Body>
            {users?.data?.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{getUserRole(user.permissions)}</td>
                <td>
                  <button
                    onClick={() => { setSelectedUser(user) }}
                  >
                    <Pencil size={15} />
                  </button>
                </td>

              </tr>
            ))}
          </Table.Body>
        </UserTable>

      </Content>
    </Container>
  )
}
