const mongoose = require("mongoose")

const exerciseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Ensure this matches your user model's name
      required: true,
    },
    name: { 
      type: String, 
      required: true // Changed 'require' to 'required'
    },
    type: { 
      type: String, 
      required: true // Changed 'require' to 'required'
    },
    duration: { 
      type: Number, 
      required: true // Changed 'require' to 'required'
    },
    caloriesBurned: { 
      type: Number, 
      required: true // Changed 'require' to 'required'
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
)

// Optionally add an index on userId for improved query performance
exerciseSchema.index({ userId: 1 })

const Exercises = mongoose.model("Exercises", exerciseSchema)

module.exports = Exercises
