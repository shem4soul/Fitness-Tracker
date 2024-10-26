const Progress = require("../models/progressModel")

const createProgress = async (req, res) => {
  try {
    const { date, weight, bodyMeasurements } = req.body
    const userId = req.user?._id

    if (!date || !weight || !bodyMeasurements) {
      return res.status(400).json({ message: "All fields are required." })
    }

    let formattedDate
    try {
      const [day, month, year] = date.split("/")
      formattedDate = new Date(`${year}-${month}-${day}`)
      if (isNaN(formattedDate)) throw new Error()
    } catch {
      return res.status(400).json({ message: "Invalid date format. Use DD/MM/YYYY." })
    }

    const progress = new Progress({
      date: formattedDate,
      weight,
      bodyMeasurements,
      userId,
    })

    const newProgress = await progress.save()

    return res.status(201).json({ message: "Progress created successfully", progress: newProgress })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getProgress = async (req, res) => {
  try {
    const userId = req.user?._id;
    const progressHistory = await Progress.find({ userId })

    if (!progressHistory || progressHistory.length === 0) {
      return res.status(404).json({ message: "No progress found" })
    }

    return res.status(200).json({ message: "Successful", progress: progressHistory })
} catch (error) {
  return res.status(500).json({ message: error.message })
}
}

const updateProgress = async (req, res) => {
try {
  const { id } = req.params
  const userId = req.user?._id

  const { date, weight, bodyMeasurements } = req.body

  let formattedDate
  if (date) {
    try {
      const [day, month, year] = date.split("/")
      formattedDate = new Date(`${year}-${month}-${day}`)
      if (isNaN(formattedDate)) throw new Error()
    } catch {
      return res.status(400).json({ message: "Invalid date format. Use DD/MM/YYYY." })
    }
  }

  const progress = await Progress.findById(id)
  if (!progress) {
    return res.status(404).json({ message: "Progress not found" })
  }

  if (progress.userId.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Unauthorized action" })
  }

  const updatedProgress = await Progress.findByIdAndUpdate(
    id,
    { date: formattedDate || progress.date, weight, bodyMeasurements },
    { new: true }
  )

  return res.status(200).json({ message: "Progress updated successfully", progress: updatedProgress });
} catch (error) {
  return res.status(500).json({ message: error.message })
}
}

const deleteProgress = async (req, res) => {
try {
  const { id } = req.params
  const userId = req.user?._id;

  const progress = await Progress.findById(id)
  if (!progress) {
    return res.status(404).json({ message: "Progress not found" })
  }

  if (progress.userId.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Unauthorized action" })
  }

  await progress.deleteOne()

  return res.status(204).json()
} catch (error) {
  return res.status(500).json({ message: error.message })
}
}

module.exports = {
createProgress,
getProgress,
updateProgress,
deleteProgress,
}
