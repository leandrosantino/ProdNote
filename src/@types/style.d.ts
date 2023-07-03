import 'styled-components'
import { type Theme } from '../contexts/themeContext'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme { }
}
