const express = require("express");
const verifyFirebaseToken = require("../middleware/firebaseAuth");
const User = require("../models/User");

const router = express.Router();

// Add destination to wishlist
router.post("/add", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const { destination } = req.body;

    const user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.wishlist.some((item) => item.id === destination.id)) {
      user.wishlist.push(destination);
      await user.save();
    }

    res.json({ userId: uid, wishlist: user.wishlist });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get wishlist
router.get("/:userId", verifyFirebaseToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ firebaseUID: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ userId, wishlist: user.wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Remove destination from wishlist
router.post("/remove", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const { destinationId } = req.body;

    const user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishlist = user.wishlist.filter(
      (destination) => destination.id !== destinationId
    );

    await user.save();

    res.json({ userId: uid, wishlist: user.wishlist });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Clear all from wishlist
router.post("/clear", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishlist = [];
    await user.save();

    res.json({ userId: uid, wishlist: user.wishlist });
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
