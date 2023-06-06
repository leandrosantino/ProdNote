import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import { ThemeModeProvider } from './contexts/themeContext'
import { AuthProvider } from './contexts/authContext'
import { GlobalStyle } from './styles/global'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeModeProvider>
        <GlobalStyle />
        <App />
      </ThemeModeProvider>
    </AuthProvider>
  </React.StrictMode>
)
