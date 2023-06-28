import { useAuth } from '../../hooks/useAuth'
import { Container } from './styles'

export function UserInfo () {
  const { user } = useAuth()

  return (
    <Container elevation={0} >
      <h2>Informações do Usuario</h2>
      <p>
        <span>Nome:</span> {user?.name}
      </p>
      <p>
        <span>Email:</span> {user?.email}
      </p>

    </Container>
  )
}
