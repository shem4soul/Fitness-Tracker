const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRouter = require("./routes/authRoutes")
const workoutRouter = require("./routes/workoutRoutes")
const nutritionRouter = require("./routes/nutritionRoutes")
const progressRouter = require("./routes/progressRoutes")


dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

if (!process.env.MONGODB_URL) {
  console.error("MONGODB_URL is not set in the environment variables.")
  process.exit(1)
}

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MONGODB CONNECTED!"))
  .catch((error) => console.error("MongoDB connection error:", error))

// Route handling
app.use("/api", authRouter)
app.use("/api", workoutRouter)
app.use("/api", nutritionRouter)
app.use("/api", progressRouter)


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Welcome to the server, this endpoint does not exist yet!",
  })
})

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})
