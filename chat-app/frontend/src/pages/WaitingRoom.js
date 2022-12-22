import React, { useContext, useEffect, useState } from "react"
import { Box, Button, Typography } from "@mui/material"
import { useNavigate, Link, useParams, Redirect } from "react-router-dom"
import io from "socket.io-client"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

import "../App.css"

const WaitingRoom = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  const navigate = useNavigate()
  const enterChat = () => {
    let path = "/chatroom"
    navigate(path)
  }

  return (
    <Box className="mainContainer">
      <Button
        color="success"
        variant="contained"
        onClick={handleClick}
      >
        Log out
      </Button>
      <Typography variant="h1">Waiting Room</Typography>
      <Button
        color="success"
        variant="contained"
        onClick={enterChat}
      >
        Start Chatting
      </Button>
    </Box>
  )
}

export default WaitingRoom
