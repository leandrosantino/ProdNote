import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { useAuth } from "./hooks/useAuth"
import { Routes } from "./routes/index."
// import { useAuth } from "./hooks/useAuth"

export function App() {

  const { isAuth } = useAuth()

  return (
    <main className={isAuth ? 'auth' : 'noAuth'}>
      <Header />
      {isAuth && <Sidebar />}
      <section>
        <Routes />
      </section>
    </main>
  )
}
