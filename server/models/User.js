const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUID: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Email validation
    fullName: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

module.exports = mongoose.model("User", userSchema);
