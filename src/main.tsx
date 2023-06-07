import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeModeProvider } from './contexts/themeContext'
import { AuthProvider } from './contexts/authContext'
import { GlobalStyle } from './styles/global'
import { AppRoutes } from './app.routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeModeProvider>
        <GlobalStyle />
        <AppRoutes />
      </ThemeModeProvider>
    </AuthProvider>
  </React.StrictMode>
)
