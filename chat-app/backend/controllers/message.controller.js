const Message = require("../models/message.model")

// @desc    Fetch message history
// @route   POST /api/messages/history
// @access  Logged in
const getHistory = async (req, res) => {
  const { chatroomId } = req.params
  try {
    const messages = await Message.find({ chatroomId }).sort({ timestamp: 1 })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getHistory
}
