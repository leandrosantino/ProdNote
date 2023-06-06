import { ReactNode, createContext, useState } from 'react'


type Mode = 'dark' | 'light'

type ThemeModeContextProps = {
  mode: Mode
  setMode: (mode: Mode) => void
}

export const ThemeModeContext = createContext({} as ThemeModeContextProps)
const { Provider } = ThemeModeContext

export function ThemeModeProvider({ children }: { children: ReactNode }) {

  const [mode, setMode] = useState<Mode>('dark')

  return (
    <Provider
      value={{ mode, setMode }}
    >
      {children}
    </Provider >
  )
}


