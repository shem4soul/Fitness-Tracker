const express = require("express")
const mongoose = require("mongoose")
const { validateToken } = require("../middleware/validateAuth")
const { validateWorkout } = require("../middleware/validations")
const {
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutCtrl")

const router = express.Router()

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid workout ID" })
  }
  next()
}

// Routes
router.post("/create-workout", validateToken, validateWorkout, createWorkout)
router.get("/find-workout", validateToken, getWorkout)
router.put("/update-workout/:id", validateToken, validateObjectId, updateWorkout)
router.delete("/delete-workout/:id", validateToken, validateObjectId, deleteWorkout)

module.exports = router
