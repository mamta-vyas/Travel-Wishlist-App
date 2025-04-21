# 🌍 Travel Wishlist App

A modern full-stack Travel Wishlist app built with **React**, **Firebase Authentication**, **Express.js**, and **MongoDB**. It enables users to sign up or log in using **email/password** or **Google provider**, and stores user data in a backend database to track user stats.

---

## 🗂 Project Structure

. ├── README.md # Project overview and instructions ├── client/ # Frontend - React.js app │ ├── public/ # Static assets │ ├── src/ # Main application code │ │ ├── components/ # Login, SignUp, and UserStats UI components │ │ ├── pages/ # Landing Page │ │ ├── config/ # Firebase configuration │ │ ├── features/ # Redux slice for user │ │ └── app/ # Redux store setup ├── server/ # Backend - Express.js server │ ├── config/ # Firebase Admin SDK setup │ ├── middleware/ # Auth middleware using Firebase │ ├── models/ # MongoDB User schema │ ├── routes/ # Auth and wishlist API endpoints │ └── server.js # Express entry point

## 🔐 Authentication Features

- 🔹 Firebase Email/Password authentication
- 🔹 Firebase Google sign-in with provider
- 🔹 Securely verifies Firebase tokens on backend using Firebase Admin SDK

---

## 🛠 Tech Stack

### Frontend (React - client)

- 🔥 Firebase Authentication
- 🌐 React + Redux
- 💨 Tailwind CSS for styling
- 📊 `UserStats.js` to display total registered users

### Backend (Node.js/Express - server)

- 🔐 Firebase Admin SDK for verifying tokens
- 🌍 MongoDB for storing registered user info
- 📁 Mongoose models and RESTful API structure

---## 📥 How to Run the Project

### 1. Clone the Repository
git clone https://github.com/mamta-vyas/Travel-Wishlist-App.git
cd Travel-Wishlist-App


2. Setup Firebase (Client)
Create a Firebase project at firebase.google.com

Enable Email/Password and Google sign-in methods

Copy your Firebase config to client/src/config/firebaseConfig.js

// firebaseConfig.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

3. Setup Firebase Admin (Server)
Generate a Firebase Admin SDK service account key from Firebase Console

Save it as server/serviceAccountKey.json

Your firebaseAdmin.js should import this and initialize the admin app

4. Start Client
cd client
npm install
npm run dev

5. Start Server
cd server
npm install
npm run dev 

Ensure MongoDB is running locally or provide a MongoDB Atlas URI in your .env file.

📈 Features

🔐 Secure Firebase login system

📡 Backend validation with token middleware

🧠 MongoDB storage for user info

📊 Live user count on landing page (via UserStats.js)

🎨 Responsive UI with animations and intuitive forms

📧 Contact
For issues or suggestions, feel free to open an issue or email at mamtavyas1990@gmail.com.

Made with ❤️ using React, Firebase, Express, and MongoDB.