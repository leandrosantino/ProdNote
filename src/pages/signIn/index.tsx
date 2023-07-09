import { Container, FormRoot, FormField } from './style'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useState, type FormEvent, useEffect } from 'react'
import * as Form from '@radix-ui/react-form'

export function SignIn () {
  const { signIn, isAuth } = useAuth()
  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const [isError, setIsError] = useState({
    userName: false,
    password: false
  })

  useEffect(() => {
    setIsError({
      userName: false,
      password: false
    })
  }, [userName, password])

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
    signIn(userName, password)
      .then(() => {
        navigate('/')
      })
      .catch(err => {
        const message = (err as Error).message
        setIsError({
          userName: message === 'Unregistered User',
          password: message === 'Invalid Password!'
        })
        console.log(message)
      })
  })

  function handleSignIn (event: FormEvent) {
    event.preventDefault()
    signIn(userName, password)
      .then(() => {
        navigate('/')
      })
      .catch(err => {
        const message = (err as Error).message
        setIsError({
          userName: message === 'Unregistered User',
          password: message === 'Invalid Password!'
        })
        console.log(message)
      })
  }

  return (
    <Container>
      <h3>Login</h3>

      <FormRoot
        onSubmit={e => { handleSignIn(e) }}
      >
        <FormField name="email" serverInvalid={isError.userName}>

          <div>
            <Form.Label>Email</Form.Label>

          {isError.userName
            ? <Form.Message>
              Usuário não registrado!
            </Form.Message>
            : <>
            <Form.Message match="valueMissing">
              Por favor insira o email
            </Form.Message>
          </>}
          </div>

          <Form.Control
            type="text"
            required
            value={userName}
            onChange={e => { setUserName(e.target.value) }}
          />

        </FormField>

        <FormField name="password" serverInvalid={isError.password}>

          <div>
            <Form.Label>Senha</Form.Label>

            {isError.password
              ? <Form.Message>
                Senha inválida!
              </Form.Message>
              : <>
              <Form.Message match="valueMissing">
                Por favor insira a senha
              </Form.Message>
            </>}
          </div>

          <Form.Control
            type="password"
            required
            value={password}
            onChange={e => { setPassword(e.target.value) }}
          />

        </FormField>

        <Form.Submit>
          ENTRAR
        </Form.Submit>

      </FormRoot>
    </Container>
  )
}
