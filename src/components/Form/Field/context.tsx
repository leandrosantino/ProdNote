import { type ReactNode, createContext, useState, useContext, useEffect } from 'react'

interface FiteldContextProps {
  isValid: boolean
  setIsValid: (value: boolean) => void
}

const fieldContext = createContext({} as FiteldContextProps)
const { Provider } = fieldContext

export const useFieldProps = () => useContext(fieldContext)

export function FieldContextProvider ({ children, ...rest }: { children: ReactNode, isValid: boolean }) {
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    setIsValid(rest.isValid)
  }, [rest.isValid])

  return (
    <Provider
      value={{
        isValid,
        setIsValid: (value) => { setIsValid(value) }
      }}
    >
      {children}
    </Provider>
  )
}
