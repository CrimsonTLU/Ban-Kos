import React, { useContext, useEffect, useState } from "react"
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography
} from "@mui/material"
import { useNavigate, Link, useParams, Redirect } from "react-router-dom"
import io from "socket.io-client"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

import "../App.css"

let socket

const ChatRoom = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [message, setMessage] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    socket = io("localhost:4000")
    socket.on("connect", () => {
      console.log("socket connected")
      console.log(socket.id)
    })
    socket.emit("join", { name: user.name, user_id: user._id })
  }, 2000)

  const handleClick = () => {
    socket.disconnect()
    socket.on("disconnect", () => {
      console.log("Socket disconnected")
    })
    logout()
  }

  const handleSubmit = () => {}

  return (
    <Box className="mainContainer">
      <Button
        color="success"
        variant="contained"
        onClick={handleClick}
      >
        Log out
      </Button>
      <Typography variant="h1">Chat Room</Typography>
      <Box className="contentContainer">
        <Box className="users">
          <Typography variant="h3">Users</Typography>
        </Box>
        <Box className="chat">
          <Typography variant="h3">Chat</Typography>
          <Box className="messageInput">
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormControl required>
                  <InputLabel>Message</InputLabel>
                  <Input
                    id="message"
                    className="messageField"
                    type="text"
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                  />
                </FormControl>
                <Button
                  color="success"
                  variant="contained"
                  type="submit"
                >
                  Send message
                </Button>
              </FormGroup>
              {error && <Box>{error}</Box>}
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatRoom
