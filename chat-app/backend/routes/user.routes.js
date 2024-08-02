const express = require("express")
const { check, validationResult } = require("express-validator")
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUsers,
  logoutUser
} = require("../controllers/user.controller")
const { protect } = require("../middleware/auth.middleware")

router.post(
  "/",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage(`The name must have a minimum length of 3 characters. `)
      .trim(),

    check("email")
      .isEmail()
      .withMessage("Invalid email address. ")
      .normalizeEmail(),

    check("password")
      .isLength({ min: 8 })
      .withMessage("Your password should have a minimum of 8 characters. ")
      .matches(/\d/)
      .withMessage("Your password should have at least one number. ")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Your password should have at least one special character.")
  ],
  registerUser
)
router.post("/login", loginUser)

router.post("/logout", protect, logoutUser)

router.get("/", getUsers)

module.exports = router
