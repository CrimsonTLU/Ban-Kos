import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSignup } from "../hooks/useSignup"
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

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signup, errors, isLoading } = useSignup()
  const navigate = useNavigate()

  const login = () => {
    navigate("/login")
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await signup(name, email, password)
  }

  return (
    <Box className="mainContainer">
      <Typography variant="h4">Sign Up</Typography>
      <Box>
        <form onSubmit={handleSubmit}>
          <FormGroup className="formContainer">
            <FormControl required>
              <InputLabel>Name</InputLabel>
              <Input
                type="text"
                onChange={e => setName(e.target.value)}
                value={name}
              />
            </FormControl>
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
              Sign up
            </Button>
            <Typography variant="h6">Already have an account?</Typography>
            <Button
              color="success"
              variant="contained"
              onClick={login}
            >
              Log in
            </Button>
          </FormGroup>
          {errors.length > 0 && (
            <Alert severity="error">
              {errors.map((error, index) => (
                <div key={index}>{error.msg}</div>
              ))}
            </Alert>
          )}
        </form>
      </Box>
    </Box>
  )
}

export default Signup
