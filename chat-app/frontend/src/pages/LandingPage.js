import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
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
  const navigate = useNavigate()
  const signup = () => {
    let path = "/signup"
    navigate(path)
  }
  const login = () => {
    let path = "/login"
    navigate(path)
  }

  return (
    <Box className="mainContainer">
      <Typography variant="h1">Welcome to Live Chat App</Typography>
      <Typography variant="h2">Login or Signup to Continue</Typography>
      <Box className="authField">
        <Button
          color="success"
          variant="contained"
          onClick={signup}
        >
          Sign up
        </Button>
        <Button
          color="success"
          variant="contained"
          onClick={login}
        >
          Log in
        </Button>
      </Box>
    </Box>
  )
}

export default LandingPage
