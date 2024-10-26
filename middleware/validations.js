const mongoose = require("mongoose")
const Workouts = require("../models/workoutModel")
const Exercises = require("../models/exerciseModel")
const Mealplans = require("../models/mealplanModel")

const validateWorkout = async (req, res, next) => {
  const { workoutName, exercises, duration, date } = req.body

  const errors = []

  if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
    errors.push("Please enter at least one exercise")
  } else {
    exercises.forEach((exercise, index) => {
      if (!exercise.name) {
        errors.push(`Exercise ${index + 1}: Please enter the exercise name`)
      }
      if (!exercise.type) {
        errors.push(`Exercise ${index + 1}: Please enter type of exercise`)
      }
      if (!exercise.duration) {
        errors.push(`Exercise ${index + 1}: Please enter the duration`)
      }
      if (!exercise.caloriesBurned) {
        errors.push(`Exercise ${index + 1}: Please enter the calories burned`)
      }
    })
  }

  if (!workoutName) {
    errors.push("Please enter a workout name")
  }
  if (!exercises) {
    errors.push("Please enter exercises")
  }
  if (!duration) {
    errors.push("Please enter the duration")
  }
  if (!date) {
    errors.push("Please enter the date")
  }
  if (errors.length > 0) {
    return res.status(404).json({
      message: errors,
    })
  }

  next()
}

const validateNutrition = async (req, res, next) => {
  const { mealName, ingredients, calories, proteins, carbs, fats } = req.body

  const errors = []

  if (!mealName) {
    errors.push("Please enter the meal name")
  }
  if (!ingredients) {
    errors.push("Please enter the ingredients")
  }
  if (!calories) {
    errors.push("Please enter the calories")
  }
  if (!proteins) {
    errors.push("Please enter the protein")
  }
  if (!carbs) {
    errors.push("Please enter the carb")
  }
  if (!fats) {
    errors.push("Please enter the fat")
  }
  if (errors.length > 0) {
    return res.status(404).json({
      message: errors,
    })
  }

  next()
}

const validateProgress = async (req, res, next) => {
  const { date, weight, bodyMeasurements } = req.body

  const errors = []

  if (!date) {
    errors.push("Please enter the date")
  }
  if (!weight) {
    errors.push("Please enter your weight")
  }
  if (!bodyMeasurements) {
    errors.push("Please enter your body Measurements")
  }
  if (errors.length > 0) {
    return res.status(404).json({
      message: errors,
    })
  }

  next()
}

const validateCertificate = async (req, res, next) => {
  const { fullName, email } = req.body

  errors = []

  if (!fullName) {
    errors.push("Please enter your full name")
  }
  if (!email) {
    errors.push("Please enter your email")
  }

  if (errors.length > 0) {
    return res.status(404).json({
      message: errors,
    })
  }

  next()
}

module.exports = {
  validateWorkout,
  validateNutrition,
  validateProgress,
}