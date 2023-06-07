import { Button, Typography } from "@mui/material";
import { Container, InputText, AuthCard } from "./style";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom'

export function SignIn() {

  const { signIn } = useAuth()
  const navigate = useNavigate()

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
          onSubmit={(e) => {
            e.preventDefault()
            signIn().then(() => {
              navigate('/')
            })
          }}
        >
          <Typography variant="h5" component="h3">
            Login
          </Typography>

          <InputText
            label="Usuário"
            type="text"
            autoComplete="current-user"
            variant="filled"
          />

          <InputText
            label="Senha"
            type="password"
            autoComplete="current-password"
            variant="filled"
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
