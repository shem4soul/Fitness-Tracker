const mongoose = require("mongoose")

const mealPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    mealName: { type: String, require: true },
    ingredients: { type: String, require: true },
    calories: { type: Number, required: true },
    proteins: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const MealPlans = new mongoose.model("MealPlans", mealPlanSchema)

module.exports = MealPlans