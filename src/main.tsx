import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeModeProvider } from './contexts/themeContext'
import { AuthProvider } from './contexts/authContext'
import { GlobalStyle } from './styles/global'
import { AppRoutes } from './routes/app.routes'
import { QueryProvider } from './providers/queryClientProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeModeProvider>
        <AuthProvider>
          <GlobalStyle />
          <AppRoutes />
        </AuthProvider>
      </ThemeModeProvider>
    </QueryProvider>
  </React.StrictMode>
)
