import { useContext } from 'react'
import { ThemeModeContext } from '../contexts/themeContext'


export function useThemeMode() {
  const dialog = useContext(ThemeModeContext)
  return dialog
}
