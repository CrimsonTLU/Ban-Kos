import React, { useEffect, useState } from "react"
import { Box, Button, Typography } from "@mui/material"
import io from "socket.io-client"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import Messages from "../components/Messages"
import axios from "axios"
import "../Styles/App.css"
import "../Styles/Chat.css"

let socket

const ChatRoom = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [connectedUsers, setConnectedUsers] = useState([])
  const [typingUsers, setTypingUsers] = useState([])

  useEffect(() => {
    socket = io("http://localhost:4000")

    socket.on("connect", () => {
      console.log("Socket connected")
      socket.emit("joinRoom", { userId: user._id, userName: user.name })
    })

    socket.on("receive_message", message => {
      setMessages(prevMessages => [...prevMessages, message])
    })

    socket.on("connectedUsers", users => {
      setConnectedUsers(users)
    })

    socket.on("userConnected", ({ userId, userName }) => {
      console.log(`${userName} connected`)
    })

    socket.on("userDisconnected", ({ userId, userName }) => {
      console.log(`${userName} disconnected`)
    })

    socket.on("typing", ({ userId, typing }) => {
      setTypingUsers(prevTypingUsers => {
        if (typing) {
          return [...new Set([...prevTypingUsers, userId])]
        } else {
          return prevTypingUsers.filter(id => id !== userId)
        }
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [user])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/messages/history/universal`,
          {
            headers: { Authorization: `Bearer ${user.token}` }
          }
        )
        setMessages(response.data)
      } catch (error) {
        console.error("Failed to fetch messages", error)
      }
    }

    fetchMessages()
  }, [user.token])

  const handleClick = () => {
    socket.disconnect()
    logout()
  }

  const handleTyping = () => {
    socket.emit("typing", { userId: user._id, typing: true })
    setTimeout(() => {
      socket.emit("typing", { userId: user._id, typing: false })
    }, 2000)
  }

  const sendMessage = async event => {
    event.preventDefault()
    if (message.trim()) {
      const newMessage = {
        sender: user.name,
        content: message,
        chatroomId: "universal"
      }
      try {
        socket.emit("sendMessage", newMessage)
        setMessage("")
      } catch (error) {
        console.error("Failed to send message", error)
      }
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
          <Typography variant="h3">Users in chat</Typography>
          {connectedUsers.map((user, index) => (
            <Typography key={index}>
              {user.userName}{" "}
              {typingUsers.includes(user.userId) && "(typing...)"}
            </Typography>
          ))}
        </Box>
        <Box className="chat">
          <Box className="messagesContainer">
            <Messages
              messages={messages}
              name={user.name}
            />
          </Box>
          <Box className="messageInput">
            <form
              action=""
              onSubmit={sendMessage}
              className="form"
            >
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={event => setMessage(event.target.value)}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    sendMessage(event)
                  } else {
                    handleTyping()
                  }
                }}
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
