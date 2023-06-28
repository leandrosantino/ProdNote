import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { type SystemPermissionKeys } from '../../server/entities/SystemPermission'

interface RequiredPermissionProps {
  permission?: SystemPermissionKeys
}

export function RequireAuth ({ permission }: RequiredPermissionProps) {
  const { isAuth, user } = useAuth()
  const location = useLocation()

  return (
    <>{
      isAuth
        ? (!permission
            ? <Outlet />
            : user?.permissions.includes(permission)
              ? <Outlet />
              : <Navigate to='/unauthorized' state={{ from: location }} replace />)
        : <Navigate to='/sginIn' state={{ from: location }} replace />
    }</>
  )
}
