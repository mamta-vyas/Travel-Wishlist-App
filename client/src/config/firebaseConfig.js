// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "travel-wishlist-app-1b984.firebaseapp.com",
  projectId: "travel-wishlist-app-1b984",
  storageBucket: "travel-wishlist-app-1b984.firebasestorage.app",
  messagingSenderId: "163604187656",
  appId: "1:163604187656:web:ef67448c93e7ccab2edfbd",
  measurementId: "G-25F32180E6",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
