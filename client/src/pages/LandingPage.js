import React, { useState } from "react";
import SignUpPage from "../components/SignUpPage";
import LoginPage from "../components/LoginPage";
import BackgroundImage from "../images/Background.webp";
import Logo from "../images/logo.jpeg";
import UserStats from "../components/UserStats";

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div
      className="min-h-screen flex justify-center bg-gray-50"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
      <div
        className="w-full max-h-[650px] max-w-md mt-4 px-8 pt-2 space-y-2 bg-white shadow-md rounded-lg bg-opacity-60 overflow-hidden"
        style={{ height: "auto" }}>
        {/* Logo Section */}
        <div className="text-center mb-2">
          <img
            src={Logo}
            alt="App Logo"
            className="w-[150px] h-[70px] mx-auto"
          />
        </div>

        {/* Title and Subtitle Section */}
        <div className="text-center p-2 bg-gradient-to-r from-pink-500 to-yellow-500 bg-opacity-80 rounded-lg transform transition duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-yellow-500 hover:to-pink-500">
          <h1 className="text-base font-semibold text-white">
            Welcome to Travel Wishlist
          </h1>
          <p className="text-base text-white">
            Please {isLogin ? "Login" : "Sign Up"} to continue
          </p>
        </div>

        {/* 💡 Show Registered User Count */}
        <div className="text-center">
          <UserStats />
        </div>

        {/* Conditionally render the LoginPage or SignUpPage */}
        {isLogin ? <LoginPage /> : <SignUpPage />}

        {/* Toggle Button */}
        <div className="text-center mt-4">
          <button
            onClick={toggleForm}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-lg font-bold rounded-full hover:from-pink-600 hover:to-yellow-600 transition duration-300">
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
