import React, { useState } from 'react';
import SignUpPage from '../components/SignUpPage'; // Import SignUp component
import LoginPage from '../components/LoginPage'; // Import Login component
import BackgroundImage from '../images/Background.webp';  // Import the background image
import Logo from '../images/logo.jpeg'; // Import the logo image

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Default to show Login form

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and sign up forms
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gray-50" 
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="w-full max-w-md p-8 space-y-2 bg-white shadow-md rounded-lg bg-opacity-60 overflow-hidden" style={{ height: '75%' }}>
        {/* Logo Section */}
        <div className="text-center mb-4">
          <img 
            src={Logo} 
            alt="App Logo" 
            className="w-20 h-20 mx-auto" // Keeps logo size within bounds
          />
        </div>

        {/* Title and Subtitle Section */}
        <div className="text-center p-6 bg-gradient-to-r from-pink-500 to-yellow-500 bg-opacity-70 rounded-lg transform transition duration-300 hover:scale-105 hover:bg-gradient-to-l hover:from-yellow-500 hover:to-pink-500">
          <h1 className="text-2xl font-semibold text-white bg-clip-text whitespace-nowrap flex justify-center items-center mx-4 rounded-lg">
            Welcome to Travel Wishlist
          </h1>
          <p className="text-lg text-white">
            Please {isLogin ? 'Login' : 'Sign Up'} to continue
          </p>
        </div>

        {/* Conditionally render the LoginPage or SignUpPage based on the state */}
        {isLogin ? <LoginPage /> : <SignUpPage />}

        {/* Button to toggle between Login and Sign Up */}
        <div className="text-center mt-4">
          <button
            onClick={toggleForm}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-lg font-bold rounded-full hover:bg-gradient-to-r hover:from-pink-600 hover:to-yellow-600 transition duration-300 focus:outline-none "
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
