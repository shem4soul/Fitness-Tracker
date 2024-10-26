const express = require("express")
const mongoose = require("mongoose")
const { validateToken } = require("../middleware/validateAuth")
const { validateProgress } = require("../middleware/validations")
const { createProgress, getProgress, updateProgress, deleteProgress } = require("../controllers/progressCtrl")

const router = express.Router()

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid progress ID" })
  }
  next()
}

// Routes
router.post("/create-progress", validateToken, validateProgress, createProgress)
router.get("/find-progress", validateToken, getProgress)
router.put("/update-progress/:id", validateToken, validateObjectId, validateProgress, updateProgress)
router.delete("/delete-progress/:id", validateToken, validateObjectId, deleteProgress)

module.exports = router
