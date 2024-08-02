import React from "react"
import { useNavigate } from "react-router-dom"
import "../Styles/App.css"
import { Box, Button, Typography } from "@mui/material"

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
      <Box className="header">
        <Typography variant="h2">Live Chat App</Typography>
      </Box>
      <Typography>Login or Signup to continue</Typography>
      <Box className="authField">
        <Button
          color="success"
          variant="contained"
          onClick={login}
        >
          Log in
        </Button>
        <Button
          color="success"
          variant="contained"
          onClick={signup}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  )
}

export default LandingPage
