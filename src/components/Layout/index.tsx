import { Header } from '../Header'
import { Sidebar } from '../Sidebar'
import { useAuth } from '../../hooks/useAuth'
import { Outlet } from 'react-router-dom'
import { Main } from './style'

export function Layout () {
  const { isAuth } = useAuth()

  return (
    <Main className={isAuth ? 'auth' : 'noAuth'}>
      <Header />
      {isAuth && <Sidebar />}
      <section>
        <Outlet />
      </section>
    </Main>
  )
}
