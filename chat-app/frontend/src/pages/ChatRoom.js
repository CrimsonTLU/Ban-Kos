import React, { useContext, useEffect, useState } from "react"
import { Box, Button, Typography } from "@mui/material"
import { useNavigate, Link, useParams, Redirect } from "react-router-dom"
import io from "socket.io-client"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import Messages from "../components/Messages"
import Input from "../components/Input"

import "../App.css"

let socket
let newMessage = false

const ChatRoom = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    socket = io("localhost:4000")
    socket.on("connect", () => {
      console.log("socket connected")
      console.log(socket.id)
    })
    socket.emit("join", { name: user.name, user_id: user._id })
  }, [])

  useEffect(
    () => {
      socket.emit("get-messages-history")
      socket.on("output-messages", messages => {
        console.log("Outputting messages")
        setMessages(messages)
      })
    },
    [],
    message
  )

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message])
    })
  }, [messages])

  const handleClick = () => {
    socket.disconnect()
    socket.on("disconnect", () => {
      console.log("Socket disconnected")
    })
    logout()
  }

  const sendMessage = event => {
    event.preventDefault()
    if (message) {
      console.log(message)
      socket.emit("sendMessage", message, () => setMessage(""))
    }
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
      <Typography variant="h1">Chat Room</Typography>
      <Box className="contentContainer">
        <Box className="users">
          <Typography variant="h3">Welcome</Typography>
          {user.name}
        </Box>
        <Box className="chat">
          <Typography variant="h3">Chat</Typography>
          <Box className="messageInput">
            <Messages
              messages={messages}
              user_id={user._id}
            />
            <form
              action=""
              onSubmit={sendMessage}
              className="form"
            >
              <input
                type="text"
                className="input"
                placeholder="Type a message"
                value={message}
                onChange={event => setMessage(event.target.value)}
                onKeyPress={event =>
                  event.key === "Enter" ? sendMessage(event) : null
                }
              />
              <Button
                color="success"
                variant="contained"
                type="submit"
              >
                Send message
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatRoom
