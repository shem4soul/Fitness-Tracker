const express = require("express")
const mongoose = require("mongoose")
const { validateToken } = require("../middleware/validateAuth")
const { validateNutrition } = require("../middleware/validations")
const {
  createMeal,
  getMeal,
  updateMeal,
  deleteMeal,
} = require("../controllers/nutritionCtrl")

const router = express.Router();

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid meal ID" })
  }
  next()
}

// Routes
router.post("/create-meal", validateToken, validateNutrition, createMeal)
router.get("/find-meal", validateToken, getMeal)
router.put("/update-meal/:id", validateToken, validateObjectId, validateNutrition, updateMeal)
router.delete("/delete-meal/:id", validateToken, validateObjectId, deleteMeal)

module.exports = router
