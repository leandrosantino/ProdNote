import { CustonToggleButton } from './style'
import { useNavigate } from 'react-router-dom'
import { type ToggleButtonProps } from '@mui/material'
import { type SystemPermissionKeys } from '../../../server/entities/SystemPermission'
import { useAuth } from '../../hooks/useAuth'

interface Props extends ToggleButtonProps {
  permission: SystemPermissionKeys
}

export function PageButton ({ value, children, permission, ...rest }: Props) {
  const navigate = useNavigate()
  const { verifyUserPermisson } = useAuth()

  return (
    <>
      {
        verifyUserPermisson(permission) &&
        <CustonToggleButton {...rest} onClick={() => { navigate(value) }} value={value}>
          {children}
        </CustonToggleButton>
      }
    </>
  )
}
