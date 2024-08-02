import { useAuthContext } from "./useAuthContext"
import axios from "axios"

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      await axios.post(
        "http://localhost:4000/api/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      localStorage.removeItem("user")
      dispatch({ type: "LOGOUT" })
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  return { logout }
}
