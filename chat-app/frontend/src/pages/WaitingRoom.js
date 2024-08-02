import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import axios from "axios"

import "../Styles/App.css"

const WaitingRoom = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:4000/api/users", {
        headers: { "x-auth-token": user.token }
      })
      setUsers(response.data)
    }
    fetchUsers()
  }, [user.token])

  const handleClick = () => {
    logout()
  }

  const openChat = () => {
    navigate("/chatroom")
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
      <Box
        sx={{
          width: "20vw",
          gap: "2px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          alignItems: "left"
        }}
      >
        <Typography variant="h2">Users on this site</Typography>
        <List>
          {users.map(chatUser => (
            <ListItem
              key={chatUser._id}
              className={chatUser.status === "online" ? "online" : "offline"}
            >
              <ListItemText
                primary={chatUser.name === user.name ? "Me" : chatUser.name}
                secondary={chatUser.status === "online" ? "Online" : "Offline"}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Button onClick={openChat}>Enter chat</Button>
      </Box>
    </Box>
  )
}

export default WaitingRoom
