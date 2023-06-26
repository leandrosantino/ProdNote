import { Button, Typography } from '@mui/material'
import { Container, InputText, AuthCard } from './style'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useState, type FormEvent } from 'react'

export function SignIn () {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  function handleSignIn (event: FormEvent) {
    event.preventDefault()
    signIn(userName, password)
      .then(() => {
        navigate('/')
      })
      .catch(err => { console.log(err) })
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
            variant="filled"
            value={userName}
            onChange={(e) => { setUserName(e.target.value) }}
          />

          <InputText
            label="Senha"
            type="password"
            autoComplete="current-password"
            variant="filled"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
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
