const express = require("express")
const {
  validateRegistration,
  validateLogin,
  validateToken,
} = require("../middleware/validateAuth")
const { registerFunction, loginFunction, resetPassword } = require("../controllers/authCtrl")

const router = express.Router()

router.post("/register", validateRegistration, registerFunction)

router.post("/login", validateLogin, loginFunction)

router.put("/reset-password", validateToken, resetPassword)

module.exports = router