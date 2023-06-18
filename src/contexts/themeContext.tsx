import { type ReactNode, createContext, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material'

type Mode = 'dark' | 'light'

interface ThemeModeContextProps {
  mode: Mode
  setMode: (mode: Mode) => void
}

export const ThemeModeContext = createContext({} as ThemeModeContextProps)
const { Provider } = ThemeModeContext

export function ThemeModeProvider ({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('light')

  return (
    <Provider
      value={{ mode, setMode }}
    >
      <ThemeProvider
        theme={createTheme({
          palette: { mode }
        })}
      >
        {children}
      </ThemeProvider>
    </Provider >
  )
}
