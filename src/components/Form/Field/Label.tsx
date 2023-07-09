import { type HTMLProps } from 'react'
import { Label } from './styles'

interface FieldLabelProps extends HTMLProps<HTMLLabelElement> {}

export function FieldLabel ({ ...rest }: FieldLabelProps) {
  return (
    <Label>
      <label {...rest} />
    </Label>
  )
}
