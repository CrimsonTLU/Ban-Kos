import React from "react"
import { Box, Typography } from "@mui/material"
import "../Chat.css"

const Message = ({ message: { name, user_id, text }, current_uid }) => {
  let isCurrentUser = false
  if (user_id === current_uid) {
    isCurrentUser = true
  }
  return isCurrentUser ? (
    <Box className="alignRight">
      <Box className="col s12 m8 16 right">
        <Typography className="sentbyme">
          {" "}
          {name}: {text}
        </Typography>
      </Box>
    </Box>
  ) : (
    <Box className="alignLeft">
      <Box className="col s12 m8 16 left">
        <Typography className="sentbyothers">
          {" "}
          {name}: {text}
        </Typography>
      </Box>
    </Box>
  )
}

export default Message
