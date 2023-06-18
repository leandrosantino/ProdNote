import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function RequireAuth () {
  const { isAuth } = useAuth()
  const location = useLocation()

  return (
    <>{
      isAuth
        ? <Outlet />
        : <Navigate to='/sginIn' state={{ from: location }} replace />
    }</>
  )
}
