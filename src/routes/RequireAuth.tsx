import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { type SystemPermissionKeys } from '../../server/entities/SystemPermission'

interface RequiredPermissionProps {
  permission?: SystemPermissionKeys
}

export function RequireAuth ({ permission }: RequiredPermissionProps) {
  const { isAuth, verifyUserPermisson } = useAuth()
  const location = useLocation()

  return (
    <>{
      isAuth
        ? (!permission
            ? <Outlet />
            : verifyUserPermisson(permission)
              ? <Outlet />
              : <Navigate to='/unauthorized' state={{ from: location }} replace />)
        : <Navigate to='/signIn' state={{ from: location }} replace />
    }</>
  )
}
