import { ToggleGroupItem } from './style'
import { useNavigate } from 'react-router-dom'
import { type SystemPermissionKeys } from '../../../server/entities/SystemPermission'
import { useAuth } from '../../hooks/useAuth'

import { type ToggleGroupItemProps } from '@radix-ui/react-toggle-group'

interface Props extends ToggleGroupItemProps {
  permission: SystemPermissionKeys
}

export function PageButton ({ value, children, permission, ...rest }: Props) {
  const navigate = useNavigate()
  const { verifyUserPermisson } = useAuth()

  return (
    <>
      {
        verifyUserPermisson(permission) &&
        <ToggleGroupItem {...rest} onClick={() => { navigate(value) }} value={value}>
          {children}
        </ToggleGroupItem>
      }
    </>
  )
}
