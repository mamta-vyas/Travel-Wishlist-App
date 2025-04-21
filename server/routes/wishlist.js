const router = require("express").Router();
const verifyFirebaseToken = require("../middleware/firebaseAuth");
const User = require("../models/User");

// Add destination to wishlist
router.post("/add", verifyFirebaseToken, async (req, res) => {
  const { uid } = req.user;
  const { destination } = req.body;

  const user = await User.findOne({ uid });
  user.wishlist.push(destination);
  await user.save();

  res.json(user.wishlist);
});

// Get wishlist
router.get("/", verifyFirebaseToken, async (req, res) => {
  const { uid } = req.user;
  const user = await User.findOne({ uid });
  res.json(user.wishlist);
});

module.exports = router;
