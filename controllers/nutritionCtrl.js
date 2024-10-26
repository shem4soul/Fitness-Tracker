const MealPlans = require("../models/mealplanModel")

const createMeal = async (req, res) => {
  try {
    const { mealName, ingredients, calories, proteins, carbs, fats } = req.body;
    const userId = req.user?._id

    if (!mealName || !ingredients || !calories || !proteins || !carbs || !fats) {
      return res.status(400).json({ message: "All fields are required." })
    }

    const meal = new MealPlans({
      mealName,
      ingredients,
      calories,
      proteins,
      carbs,
      fats,
      userId,
    });

    const newMeal = await meal.save()

    return res.status(201).json({ message: "Meal created successfully", meal: newMeal })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getMeal = async (req, res) => {
  try {
    const userId = req.user?._id;
    const mealHistory = await MealPlans.find({ userId })

    if (!mealHistory || mealHistory.length === 0) {
      return res.status(404).json({ message: "No Meal Plan Found" })
    }

    return res.status(200).json({
      message: "Fetched successfully",
      mealplan: mealHistory,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const updateMeal = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user?._id

    const { mealName, ingredients, calories, proteins, carbs, fats } = req.body

    const meal = await MealPlans.findById(id)
    if (!meal) {
      return res.status(404).json({ message: "Meal Plan not found" })
    }

    if (meal.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized action" })
    }

    const updatedMeal = await MealPlans.findByIdAndUpdate(
      id,
      { mealName, ingredients, calories, proteins, carbs, fats },
      { new: true }
    );

    return res.status(200).json({ message: "Meal updated successfully", updatedMeal })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const meal = await MealPlans.findById(id);
    if (!meal) {
      return res.status(404).json({ message: "Meal Plan not found" })
    }

    if (meal.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized action" })
    }

    await meal.deleteOne()

    return res.status(204).json({ message: "Meal deleted successfully" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
};

module.exports = {
  createMeal,
  getMeal,
  updateMeal,
  deleteMeal,
}
