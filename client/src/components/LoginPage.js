import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setUser, setError } from "../features/userSlice";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "../config/firebaseConfig";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);

  // 📥 EMAIL/PASSWORD LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setLoading());

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;
      const token = await firebaseUser.getIdToken();
      console.log(token);
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          fullName: firebaseUser.displayName || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const backendUser = response.data;

      dispatch(
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          fullName: firebaseUser.displayName || backendUser.fullName || "",
          ...backendUser,
        })
      );

      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (error) {
      dispatch(setError(error?.response?.data?.error || error.message));
    }
  };

  // 🌐 GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    dispatch(setLoading());
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const token = await firebaseUser.getIdToken();

      const response = await axios.post(
        "http://localhost:5000/api/user/google-login",
        {
          email: firebaseUser.email,
          firebaseUID: firebaseUser.uid,
          fullName: firebaseUser.displayName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const backendUser = response.data;

      dispatch(
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          fullName: firebaseUser.displayName,
          ...backendUser,
        })
      );

      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (error) {
      dispatch(setError(error?.response?.data?.error || error.message));
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-3 max-w-md mx-auto mt-6"
      style={{ maxHeight: "60vh" }}>
      {/* Email */}
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

      {/* Password */}
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
            placeholder="Enter your password"
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

      {/* Buttons */}
      <div className="flex flex-col items-center space-y-3 mt-4">
        <button
          type="submit"
          className="w-3/4 py-2 px-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-lg font-bold rounded-full hover:from-pink-600 hover:to-yellow-600 transition duration-300 focus:outline-none">
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-3/4 py-2 mt-4 px-4 bg-gradient-to-r from-pink-800 to-yellow-700 text-white text-lg font-bold rounded-full hover:from-pink-900 hover:to-yellow-600 transition duration-300 focus:outline-none transform hover:scale-105 shadow-xl hover:shadow-2xl relative overflow-hidden">
          Login with Google
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-800 to-yellow-700 opacity-30 rounded-full animate-spin"></span>
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
