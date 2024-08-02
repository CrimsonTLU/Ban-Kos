import React from "react"
import { Box, Typography } from "@mui/material"
import "../Styles/Chat.css"

const Message = ({ message, current_name }) => {
  const isCurrentUser = message.sender === current_name

  return (
    <Box className={isCurrentUser ? "alignRight" : "alignLeft"}>
      <Box
        className={isCurrentUser ? "col s12 m8 16 right" : "col s12 m8 16 left"}
      >
        <Typography className={isCurrentUser ? "sentbyme" : "sentbyothers"}>
          {`${isCurrentUser ? "Me" : message.sender}: `} {message.content}
        </Typography>
      </Box>
    </Box>
  )
}

export default Message
