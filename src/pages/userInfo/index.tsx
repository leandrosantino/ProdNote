import { useAuth } from '../../hooks/useAuth'

export function UserInfo () {
  const { user } = useAuth()

  return (
    <div>
      <h2>Informações do Usuario</h2>
      <p>
        <span>Nome:</span> {user?.name}
      </p>
      <p>
        <span>Email:</span> {user?.email}
      </p>

    </div>
  )
}
