import { type ReactNode, createContext, useState } from 'react'
import { setToken, fetch } from '../utils/api'
import type { SystemPermissionKeys } from '../../server/entities/SystemPermission'

interface User {
  id: string
  name: string
  email: string
  permissions: SystemPermissionKeys[]
}

interface AuthContextProps {
  isAuth: boolean
  user: User | null
  signIn: (userName: string, password: string) => Promise<void>
  signOut: () => void
  verifyUserPermisson: (permission: SystemPermissionKeys) => boolean | undefined
}

export const AuthContext = createContext({} as AuthContextProps)
const { Provider } = AuthContext

export function AuthProvider ({ children }: { children: ReactNode }) {
  const [isAuth, setAuth] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  async function signIn (userName: string, password: string) {
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
  }

  function signOut () {
    setAuth(false)
    setUser(null)
    setToken('')
  }

  function verifyUserPermisson (permission: SystemPermissionKeys) {
    return user?.permissions.includes(permission)
  }

  return (
    <Provider value={{
      isAuth,
      user,
      signIn,
      signOut,
      verifyUserPermisson
    }}>
      {children}
    </Provider>
  )
}
