import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"
import "../Styles/App.css"
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
  Alert
} from "@mui/material"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isLoading } = useLogin()
  const navigate = useNavigate()

  const signup = () => {
    navigate("/signup")
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <Box className="mainContainer">
      <Typography variant="h4">Login</Typography>
      <Box>
        <form onSubmit={handleSubmit}>
          <FormGroup className="formContainer">
            <FormControl required>
              <InputLabel>Email address</InputLabel>
              <Input
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </FormControl>
            <FormControl required>
              <InputLabel>Password</InputLabel>
              <Input
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </FormControl>
            <Button
              color="success"
              variant="contained"
              type="submit"
              disabled={isLoading}
            >
              Log in
            </Button>
            <Typography variant="h6">No account?</Typography>
            <Button
              color="success"
              variant="contained"
              onClick={signup}
            >
              Sign up
            </Button>
          </FormGroup>
          {error && <Alert severity="error">{error}</Alert>}
        </form>
      </Box>
    </Box>
  )
}

export default Login
