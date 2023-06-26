import { type ReactNode, createContext, useState } from 'react'
import { setToken, fetch } from '../utils/api'
import type { SystemPermissionKeys } from '../../server/entities/SystemPermission'

interface User {
  name: string
  email: string
  permissions: SystemPermissionKeys[]
}

interface AuthContextProps {
  isAuth: boolean
  user: User | null
  signIn: (userName: string, password: string) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextProps)
const { Provider } = AuthContext

export function AuthProvider ({ children }: { children: ReactNode }) {
  const [isAuth, setAuth] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  async function signIn (userName: string, password: string) {
    try {
      const accessToken = await fetch.auth.login.mutate({
        userName,
        password
      })
      if (accessToken) {
        setToken(accessToken)

        const userInfo = await fetch.user.getInfo.query()

        setUser(userInfo)
        setAuth(true)
      }
    } catch (err) {
      console.log((err as Error).stack)
    }
  }

  function signOut () {
    setAuth(false)
    setUser(null)
    setToken('')
  }

  return (
    <Provider value={{
      isAuth,
      user,
      signIn,
      signOut
    }}>
      {children}
    </Provider>
  )
}
