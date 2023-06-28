import { Button, Typography } from '@mui/material'
import { Container, InputText, AuthCard } from './style'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useState, type FormEvent, useEffect } from 'react'

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
    if (isAuth) {
      navigate('/')
    }
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
    <Container elevation={0}>

      <div>
        <Typography variant="h5" component="h1">
          PCP - System
        </Typography>
        <Typography variant="subtitle1" component="h2">
          Sistema de Planejamento e Controle de Produção
        </Typography>
      </div>

      <AuthCard elevation={3}>
        <form
          onSubmit={handleSignIn}
        >
          <Typography variant="h5" component="h3">
            Login
          </Typography>

          <InputText
            label="Usuário"
            type="text"
            autoComplete="current-user"
            variant="standard"
            value={userName}
            onChange={(e) => { setUserName(e.target.value) }}
            error={isError.userName}
            helperText={isError.userName ? 'Usuário não cadastrado!' : ''}
          />

          <InputText
            label="Senha"
            type="password"
            autoComplete="current-password"
            variant="standard"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            error={isError.password}
            helperText={isError.password ? 'Senha incorreta!' : ''}
          />

          <Button
            variant="contained"
            color="primary"
            size="medium"
            type="submit"
          >
            Entrar
          </Button>
        </form>

      </AuthCard>
    </Container >
  )
}
