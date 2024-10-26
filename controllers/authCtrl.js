const Users = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerFunction = async (req, res) => {
  try {
    const { username, email, password, profile } = req.body

    const alreadyExisting = await Users.findOne({ username })
    if (alreadyExisting) {
      return res
        .status(400)
        .json({ message: "This username has an existing account" })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
      profile,
    })

    await newUser.save();

    return res.status(201).json({
      message: "Registration successful",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profile: newUser.profile,
      },
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const loginFunction = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User account not found" })
    }

    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      return res.status(400).json({ message: "Incorrect username or password!" })
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "30m",
    })

    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "50m",
    })

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile,
      },
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedPassword = await Users.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    )

    if (!updatedPassword) {
      return res.status(404).json({ message: "Account not found" })
    }

    return res.status(200).json({
      message: "Password reset successful",
      user: {
        _id: updatedPassword._id,
        username: updatedPassword.username,
        email: updatedPassword.email,
        profile: updatedPassword.profile,
      },
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  registerFunction,
  loginFunction,
  resetPassword,
}