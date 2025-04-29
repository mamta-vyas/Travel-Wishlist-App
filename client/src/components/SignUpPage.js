import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setUser, setError } from "../features/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "../config/firebaseConfig";
import { updateProfile } from "firebase/auth";

const SignUpPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth(firebaseApp);

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(setLoading());

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      const user = auth.currentUser;
      const idToken = await user.getIdToken(); // 👈 Get Firebase token here
      // console.log(idToken);
      // console.log(user);
      const userData = {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName,
      };

      dispatch(setUser(userData));

      const response = 
      await fetch("https://travel-wishlist-app.onrender.com/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`, // 👈 Send token in headers
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to register user on server");
      }

      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.message);
      dispatch(setError(error.message));
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="space-y-3 max-w-md mx-auto mt-6"
      style={{ maxHeight: "60vh" }}>
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-semibold text-pink-900">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          placeholder="Enter your full name"
          className="w-full px-3 py-2 mt-1 border-2 border-gray-400 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-pink-900">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="w-full px-3 py-2 mt-1 border-2 border-gray-400 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-pink-900">
          Password
        </label>
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password"
            className="w-full px-3 py-2 mt-1 border-2 border-gray-400 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-sm"
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-xs">
            {isPasswordVisible ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-3 mt-4">
        <button
          type="submit"
          className="w-3/4 py-2 px-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-lg font-bold rounded-full hover:bg-gradient-to-r hover:from-pink-600 hover:to-yellow-600 transition duration-300 focus:outline-none">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpPage;
