import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const json = await response.json()

      if (!response.ok) {
        throw new Error("Wrong password or username")
      }

      localStorage.setItem("user", JSON.stringify(json))

      dispatch({ type: "LOGIN", payload: json })
    } catch (err) {
      setError("Wrong password or username")
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}
