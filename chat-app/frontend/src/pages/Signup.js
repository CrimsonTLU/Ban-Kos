import React, { useState } from "react"
import { useSignup } from "../hooks/useSignup"
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

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async e => {
    e.preventDefault()

    if(!(email.isEmail())){
      error += " Please enter a valid email! "
    }
    
    if(!(password.isLength({ min: 6 }))){
      error += " Password length must be atleast 6 characters. "
    }

    await signup(name, email, password)
  }

  return (
    <Box className="mainContainer">
    <Typography>Sign up</Typography>
    <form onSubmit={handleSubmit}>
        <FormGroup>
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
        </FormGroup>
        {error && <Box>{error}</Box>}
    </form>
    </Box>
  )
}

export default Signup
