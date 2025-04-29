const verifyFirebaseToken = require("../middleware/firebaseAuth");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /register (secure)
router.post("/register", verifyFirebaseToken, async (req, res) => {
  try {
    // console.log("Received signup data from frontend:", req.body);
    const { email, fullName } = req.body;
    const uid = req.user.uid; // From Firebase token

    let user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      user = await User.create({ firebaseUID: uid, email, fullName });
    }

    res.status(201).json(user);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "User registration failed" });
  }
});

// POST /login (secure)
router.post("/login", verifyFirebaseToken, async (req, res) => {
  try {
    // console.log("Received login data from frontend:", req.body);
    const { email, fullName } = req.body;
    const uid = req.user.uid;

    let user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      user = await User.create({ firebaseUID: uid, email, fullName });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "User login failed" });
  }
});

// POST /google-login (secure)
router.post("/google-login", verifyFirebaseToken, async (req, res) => {
  try {
    // console.log("Received Google login data from frontend:", req.body);
    const { email, fullName } = req.body;
    const uid = req.user.uid;

    let user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      user = await User.create({ firebaseUID: uid, email, fullName });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ error: "Google login failed" });
  }
});

router.get("/usercount", async (req, res) => {
  try {
    const count = await User.countDocuments(); // counts all users
    res.json({ totalUsers: count });
  } catch (error) {
    console.error("Error getting user count:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
