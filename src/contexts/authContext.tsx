import { ReactNode, createContext, useState } from 'react'

interface AuthContextProps {
  isAuth: boolean;
  user: {
    name: string
  };
  signIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps)
const { Provider } = AuthContext

export function AuthProvider({ children }: { children: ReactNode }) {

  const [isAuth, setAuth] = useState(true)

  function signIn() {
    setAuth(true)
  }

  function signOut() {
    setAuth(false)
  }

  return (
    <Provider value={{
      isAuth,
      user: {
        name: 'Produção'
      },
      signIn,
      signOut
    }}>
      {children}
    </Provider>
  )

}
