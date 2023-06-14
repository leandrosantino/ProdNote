import { ReactNode, createContext, useState } from 'react'
import { setToken, fetch } from '../utils/api';

interface AuthContextProps {
  isAuth: boolean;
  user: {
    name: string
  };
  signIn: () => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps)
const { Provider } = AuthContext

export function AuthProvider({ children }: { children: ReactNode }) {

  const [isAuth, setAuth] = useState(false)

  async function signIn() {

    try {
      const access_token = await fetch.auth.login.mutate({
        userName: 'PROD@adler',
        password: 'alpha45c'
      })
      if (access_token) {
        setToken(access_token)
        setAuth(true)
      }
    } catch (err) {
      console.log(err)
    }

  }

  function signOut() {
    setAuth(false)
    setToken('')
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
