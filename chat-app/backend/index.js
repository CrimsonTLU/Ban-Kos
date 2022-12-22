require("dotenv").config()
const express = require("express")
const app = express()
const http = require("http").createServer(app)
const cors = require("cors")
const socketio = require("socket.io")
const io = socketio(http,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/users", require("./routes/user.routes"))

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

const room_id = "chatroom"

const { addUser, getUser, removeUser } = require('./utility/util')

io.on("connection", socket => {
  console.log("socket id:" + socket.id)
  socket.on("join", ({ name, user_id }) => {
    const { error, user } = addUser({
      socket_id: socket.id,
      name,
      user_id
    })
    socket.join(room_id)
    if (error) {
      console.log("join error", error)
    } else {
      console.log("join user", user)
    }
  })
  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  })
  socket.on("sendMessage", (message, room_id, callback) => {
    const user = getUser(socket.id)
    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: message
    }
    console.log("message", msgToStore)
    const msg = new Message(msgToStore)
    msg.save().then(result => {
      io.to(room_id).emit("message", result)
      callback()
    })
  })
  socket.on("get-messages-history", room_id => {
    Message.find({ room_id }).then(result => {
      socket.emit("output-messages", result)
    })
  })
  socket.on("disconnect", () => {
    console.log(socket.id)
    const user = removeUser(socket.id) 
    console.log("user disconnected")
  })
})

http.listen(4000, () => console.log(`Server started on port 4000`))
