const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/auth.middleware")
const { getHistory } = require("../controllers/message.controller")

router.get("/history/:chatroomId", protect, getHistory)

module.exports = router
