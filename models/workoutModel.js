const mongoose = require("mongoose")

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Ensure 'Users' model is correctly defined
      required: true,
    },
    workoutName: { 
      type: String, 
      required: true // Changed 'require' to 'required'
    },
    exercises: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Exercises", // Ensure 'Exercises' model is correctly defined
      required: true // Optional: depending on your application logic
    }],
    duration: { 
      type: Number, 
      required: true 
    },
    date: { 
      type: Date, 
      required: true 
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
)

// Optionally add an index on userId for improved query performance
workoutSchema.index({ userId: 1 });

const Workouts = new mongoose.model("Workouts", workoutSchema)

module.exports = Workouts
