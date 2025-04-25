// src/pages/UserInfo.jsx
import React from 'react';
import { useSelector } from 'react-redux';


const UserInfo = () => {
  // Access user data and loading state from Redux store
  const user = useSelector((state) => state.user.user); // Get user info
  const loading = useSelector((state) => state.user.loading); // Get loading state

  // If the user is loading (e.g., login is in progress), show a loading spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is not logged in, show a message
  if (!user) {
    return <div>Please log in to see your information.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar || 'https://i.pravatar.cc/150'} // Fallback avatar if none provided
            alt="User avatar"
            className="w-20 h-20 rounded-full border-4 border-purple-300"
          />
          <div>
            <h2 className="text-xl font-bold text-purple-800">{user.fullName}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">📍 {user.location || 'Location not set'}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-700 italic">"{user.bio || 'No bio available'}"</p>
          <p className="mt-2 text-sm text-gray-500">Joined: {user.joined || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
