import React, { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import "../App.css"
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography
} from "@mui/material"

const LandingPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async e => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <Box className="mainContainer">
    <Typography variant="h1">Welcome to Live Chat App</Typography>
    <Typography variant="h2">Login or Signup to Continue</Typography>
    <form onSubmit={handleSubmit}>
        <FormGroup>
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
        </FormGroup>
        {error && <Box>{error}</Box>}
    </form>
    </Box>
)
}

export default LandingPage
