import { useAuth } from "../hooks/useAuth";
import { SignIn } from "../pages/signIn";
import { ProductionRoutes } from "./production.routes";


export function Routes() {

  const { isAuth } = useAuth()

  return (
    <>
      {isAuth ?
        <ProductionRoutes /> :
        <SignIn />
      }
    </>
  )
}
