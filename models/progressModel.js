const mongoose = require("mongoose")

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, default: Date.now },
    weight: { type: Number, required: true },
    bodyMeasurements: {
      chest: { type: Number, default: 0 },
      waist: { type: Number, default: 0 },
      arms: { type: Number, default: 0 },
      legs: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const Progress = new mongoose.model("Progress", progressSchema)

module.exports = Progress
