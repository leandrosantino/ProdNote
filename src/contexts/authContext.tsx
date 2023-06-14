import { ReactNode, createContext, useState } from 'react'
import { setToken, fetch } from '../utils/api';
import type { SystemPermissionKeys } from '../../server/entities/SystemPermission';

interface User {
  name: string
  email: string
  permissions: SystemPermissionKeys[]
}

interface AuthContextProps {
  isAuth: boolean
  user: User | null
  signIn: () => Promise<void>
  signOut: () => void
}


export const AuthContext = createContext({} as AuthContextProps)
const { Provider } = AuthContext

export function AuthProvider({ children }: { children: ReactNode }) {

  const [isAuth, setAuth] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  async function signIn() {

    try {
      const access_token = await fetch.auth.login.mutate({
        userName: 'PROD@adler',
        password: 'alpha45c'
      })
      if (access_token) {
        setToken(access_token)

        const userInfo = await fetch.user.getInfo.query()

        setUser(userInfo)
        setAuth(true)
      }
    } catch (err) {
      console.log((err as Error).stack)
    }

  }

  function signOut() {
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
