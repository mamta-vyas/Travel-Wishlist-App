🌍 Travel Wishlist App

A modern, full-stack Travel Wishlist Web App built with React.js, Node.js, Express.js, MongoDB, Firebase Authentication, and Redux Toolkit.
It offers a seamless experience where users can sign up, explore cities, see weather, nearby places, maps, and maintain their own wishlist — all in one single web app.

🗂 Project Structure

Travel-Wishlist-App/
├── README.md
├── client
│   ├── firebase.json
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── 404.html
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── app
│   │   │   └── store.js
│   │   ├── components
│   │   │   ├── AuthInitializer.js
│   │   │   ├── Dashboard.js
│   │   │   ├── DestinationDetails.js
│   │   │   ├── Header.js
│   │   │   ├── LoginPage.js
│   │   │   ├── SearchBar.js
│   │   │   ├── SignUpPage.js
│   │   │   └── UserStats.js
│   │   ├── config
│   │   │   └── firebaseConfig.js
│   │   ├── features
│   │   │   ├── userSlice.js
│   │   │   └── wishlistSlice.js
│   │   ├── images
│   │   │   ├── Background.webp
│   │   │   └── logo.jpeg
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── pages
│   │   │   ├── About.js
│   │   │   ├── Contact.js
│   │   │   ├── Home.js
│   │   │   ├── LandingPage.js
│   │   │   ├── UserInfo.js
│   │   │   └── Wishlist.js
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   └── tailwind.config.js
└── server
    ├── config
    │   └── firebaseAdmin.js
    ├── middleware
    │   └── firebaseAuth.js
    ├── models
    │   └── User.js
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   ├── authRoutes.js
    │   └── wishlist.js
    ├── server.js
    └── serviceAccountKey.json

🔥 Key Features

🔐 Firebase Authentication (Email/Password + Google provider)

🗺️ Explore city details: Map, Photos, Weather, Nearby Places in one app

🛒 Wishlist functionality with Local Storage persistence

🧠 User Session with Redux Toolkit state management

📈 UserStats: Display how many users registered and wishlisted

🏙️ Temporary Cities Search using Session Storage (resets on refresh or relogin)

⚡ Optimized Map rendering with timed delay for large city data

🌤️ Real-time Weather data fetching

🏞️ Nearby Places using FourSquare API (proper latitude/longitude fixed)

🌐 Google Gemini API integration to search Country Code and Region Code of cities

🎨 Intuitive and Attractive UI with Tailwind CSS

🖼️ One-place dashboard: View everything about a city without switching apps


🛠 Tech Stack

Frontend (React.js - Client)
⚛️ React.js

🎯 Redux Toolkit (@reduxjs/toolkit) and react-redux for state management

🧩 Tailwind CSS for responsive and modern UI

🔥 Firebase Authentication for secure sign-in/sign-up

📦 LocalStorage and SessionStorage for user and temporary data persistence

🔍 Google Gemini API for finding city, country code, and region/state code

🌡️ OpenWeatherMap API for fetching real-time weather data

🖼️ Unsplash API for fetching beautiful images of places and cities

🌍 Foursquare Places API for fetching nearby places

🗺️ Leaflet.js with MapTiler API and MapTiler Key for interactive maps

📈 UserStats component to show live registered users

🗺️ Map Integration with optimized rendering using time delays for smooth user experience


Backend (Node.js/Express - Server)
🚀 Express.js server with REST API architecture

🔐 Firebase Admin SDK to verify Firebase ID tokens on backend

🛢️ MongoDB with Mongoose for user data storage


📥 How to Run the Project
1. Clone the Repository
git clone https://github.com/mamta-vyas/Travel-Wishlist-App.git
cd Travel-Wishlist-App

2. Setup Firebase (Client Side)
Create a Firebase project at Firebase Console
Enable Email/Password and Google authentication
Copy the config keys to client/src/config/firebaseConfig.js:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

3. Setup Firebase Admin (Server Side)
Generate a Service Account Key from Firebase Console
Save it as server/serviceAccountKey.json
Import it in server/config/firebaseAdmin.js to initialize Firebase Admin SDK

4. Setup Environment Variables
Create a .env file in server/ with:

MONGO_URI=your_mongodb_uri
PORT=5000

Make sure MongoDB is running locally or connected to Atlas.

5. Install Client Dependencies and Run
cd client
npm install
npm start

6. Install Server Dependencies and Run
cd server
npm install
npm run dev

⚙️ Improvements and Optimizations Done
🧹 Fixed Map Loading: Added a timeout delay to ensure smoother map rendering when many cities are loaded.

🌍 FourSquare Nearby Places Fixed: Now correctly fetches using accurate latitude and longitude values for cities.

📦 Session Storage: Temporary cities search data stored in SessionStorage and reset upon page reload or new login.

🛒 Wishlist Persistence: Added wishlist storage via LocalStorage so that user's favorite cities are remembered.

🔎 Google Gemini API Search: Added a feature to lookup Country Code and State Code if the user doesn't know them.

📊 User Stats Improvement: Track total registered users.

✨ Beautiful Dashboard: View Weather, Map, Photos, and Places of a city — no need to open multiple websites!

🛠️ Code Splitting: App structured into small manageable components for scalability and maintainability.

🎨 Polished UI: Fully responsive, visually appealing design with animations and clean forms.

✉️ Contact
📧 Email: mamtavyas1990@gmail.com
📌 Issues/Suggestions: Feel free to open an Issue

❤️ Made with Passion using
React | Redux Toolkit | Firebase | Node.js | Express.js | MongoDB | Tailwind CSS | Google Gemini API | FourSquare API