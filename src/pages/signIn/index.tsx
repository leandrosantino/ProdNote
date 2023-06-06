import { Button, Typography } from "@mui/material";
import { Container, InputText, AuthCard } from "./style";
import { useAuth } from "../../hooks/useAuth";

export function SignIn() {

  const { signIn } = useAuth()

  return (
    <Container>
      <AuthCard elevation={3}>

        <Typography variant="h5" component="h2">
          Login
        </Typography>

        <InputText
          id="standard-password-input"
          label="Usuário"
          type="text"
          autoComplete="current-user"
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <InputText
          id="standard-password-input"
          label="Senha"
          type="password"
          autoComplete="current-password"
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={() => { signIn() }}
        >
          Entrar
        </Button>
      </AuthCard>
    </Container>
  )
}
