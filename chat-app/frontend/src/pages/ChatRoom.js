import React from "react"
import { Box, Button, Typography } from "@mui/material"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const ChatRoom = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <Box>
            <Button
            color="success"
            variant="contained"
            onClick={handleClick}
        >
            Log out
        </Button>
            <Typography variant="h1">Chat Room</Typography>
        </Box>
    )
}

export default ChatRoom
