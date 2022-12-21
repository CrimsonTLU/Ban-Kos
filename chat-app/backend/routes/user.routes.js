const express = require("express")
const { check, validationResult } = require("express-validator")
const router = express.Router()
const { registerUser, loginUser } = require("../controllers/user.controller")

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
      .withMessage("Your password should have at least one sepcial character.")
  ],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg)

    const hasError = !error.isEmpty()

    if (hasError) {
      res.status(422).json({ error: error.array() })
    } else {
      next()
    }
  },
  registerUser
)
router.post("/", loginUser)

module.exports = router