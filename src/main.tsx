import ReactDOM from 'react-dom/client'
import { ThemeModeProvider } from './contexts/themeContext'
import { AuthProvider } from './contexts/authContext'
import { GlobalStyle } from './styles/global'
import { AppRoutes } from './routes/app.routes'
import { QueryProvider } from './providers/queryClientProvider'
import { SideBarContextProvider } from './contexts/sideBarContext'
import { DialogProvider } from './contexts/dialogContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode></React.StrictMode>
    <QueryProvider>
      <ThemeModeProvider>
        <AuthProvider>
          <DialogProvider>
            <SideBarContextProvider>
              <GlobalStyle />
              <AppRoutes />
            </SideBarContextProvider>
          </DialogProvider>
        </AuthProvider>
      </ThemeModeProvider>
    </QueryProvider>

)
