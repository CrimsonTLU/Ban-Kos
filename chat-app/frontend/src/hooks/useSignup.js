import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import axios from "axios"

export const useSignup = () => {
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (name, email, password) => {
    setIsLoading(true)
    setErrors([])

    try {
      const response = await axios.post("http://localhost:4000/api/users", {
        name,
        email,
        password
      })

      if (response.status === 201) {
        const user = response.data
        localStorage.setItem("user", JSON.stringify(user))
        dispatch({ type: "LOGIN", payload: user })
      }
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors)
      } else if (err.response && err.response.data.message) {
        setErrors([{ msg: err.response.data.message }])
      } else {
        setErrors([{ msg: "Signup failed" }])
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { signup, errors, isLoading }
}
