const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

// ✅ Add this section to initialize Firebase Admin
const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS);

// Replace escaped newlines with real newlines
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount your routes
app.use("/api/user", authRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log("🔌 Connected to MongoDB");
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
  });
