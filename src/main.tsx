import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeModeProvider } from './contexts/themeContext'
import { AuthProvider } from './contexts/authContext'
import { GlobalStyle } from './styles/global'
import { AppRoutes } from './routes/app.routes'
import { QueryProvider } from './providers/queryClientProvider'
import { SideBarContextProvider } from './contexts/sideBarContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeModeProvider>
        <AuthProvider>
          <SideBarContextProvider>
            <GlobalStyle />
            <AppRoutes />
          </SideBarContextProvider>
        </AuthProvider>
      </ThemeModeProvider>
    </QueryProvider>
  </React.StrictMode>
)
