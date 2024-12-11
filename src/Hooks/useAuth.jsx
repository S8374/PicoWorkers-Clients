import { useContext } from "react"
import { AuthContext } from "../Components/Providers/AuthProviders"

export const UseAuth = () => {
    const auth = useContext(AuthContext)
  return auth
}
