import { type ReactNode } from 'react'
import { Root } from './styles'
import { FieldContextProvider } from './context'

interface FieldRootProps {
  children: ReactNode
  isValid: boolean
  message?: string
  className?: string
}

export function FieldRoot ({ children, isValid, message, className }: FieldRootProps) {
  return (
    <FieldContextProvider {...{ isValid }} >
        <Root {...{ className }}>
          {children}
          {!isValid &&
            <span>{message}</span>
          }
        </Root>
    </FieldContextProvider>
  )
}
