const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./src/models/User"); // ✅ Correct Import Path
require('dotenv').config()
const app = require('./src/app')

const path = require("path");
const _dirname = path.resolve(__dirname, "..");

app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://manviths41:68067602%40m@cluster0.ermka.mongodb.net/codeReviewDB",
    {
      
    }
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ SIGNUP ROUTE
app.post("/api/signup", async (req, res) => {
  const { username, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ username, email });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { username, email },
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ LOGIN ROUTE
app.post("/api/login", async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findOne({ username, email });

    if (user) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: { username, email },
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.use(express.static(path.join(_dirname,"/Frontend/dist")));
app.get('*', (_,res) => {
  res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"));
})

// ✅ START SERVER
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

