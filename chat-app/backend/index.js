require("dotenv").config()
const express = require("express")
const app = express()
const http = require("http").createServer(app)
const cors = require("cors")
const socketio = require("socket.io")
const io = socketio(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use("/api/users", require("./routes/user.routes"))
app.use("/api/messages", require("./routes/message.routes"))

const connectDB = require("./utility/db")

connectDB()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  next()
})

// Socket.IO
let room_id = "universal"
const Message = require("./models/message.model")

let connectedUsers = []

io.on("connection", socket => {
  console.log("New connection")

  socket.on("joinRoom", ({ userId, userName }) => {
    const user = { id: socket.id, userId, userName, typing: false }
    connectedUsers.push(user)
    socket.join(room_id)
    console.log(`${userName} joined the chatroom`)

    io.to(room_id).emit("connectedUsers", connectedUsers)

    socket.broadcast.to(room_id).emit("userConnected", { userId, userName })
  })

  socket.on("sendMessage", async ({ sender, content, chatroomId }) => {
    const newMessage = new Message({
      sender,
      content,
      chatroomId
    })
    await newMessage.save()
    io.to(chatroomId).emit("receive_message", newMessage)
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id)
    const user = connectedUsers.find(user => user.id === socket.id)
    connectedUsers = connectedUsers.filter(user => user.id !== socket.id)

    io.to(room_id).emit("connectedUsers", connectedUsers)

    if (user) {
      socket.broadcast.to(room_id).emit("userDisconnected", {
        userId: user.userId,
        userName: user.userName
      })
    }
  })

  socket.on("typing", ({ userId, typing }) => {
    const user = connectedUsers.find(user => user.userId === userId)
    if (user) {
      user.typing = typing
    }
    io.to(room_id).emit("typing", { userId, typing })
  })
})

http.listen(4000, () => console.log(`Server started on port 4000`))
