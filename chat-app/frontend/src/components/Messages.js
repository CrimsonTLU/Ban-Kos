import React from "react"
import { Box } from "@mui/material"
import Message from "./Message"
import "../Styles/Chat.css"

const Messages = ({ messages, name }) => {
  return (
    <Box sx={{ marginBottom: "10vh" }}>
      {messages.map((msg, index) => (
        <Message
          key={index}
          message={msg}
          current_name={name}
        />
      ))}
    </Box>
  )
}

export default Messages
