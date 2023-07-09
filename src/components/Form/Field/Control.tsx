import { type ReactNode } from 'react'
import { useFieldProps } from './context'
import { Control } from './styles'

interface FieldControlProps {
  icon?: ReactNode
  children: ReactNode
}

export function FieldControl ({ icon, children }: FieldControlProps) {
  const { isValid } = useFieldProps()

  return (
    <Control
      data-icon={icon ? 'on' : 'off'}
      data-invalid={isValid ? 'false' : 'true'}
    >
      {children}
      {icon}
    </Control>
  )
}
