import React, { useEffect, useState } from 'react';

const UserStats = () => {
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/user/usercount');
        const data = await res.json();
        setUserCount(data.totalUsers);
      } catch (err) {
        console.error('Error fetching user count:', err);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="relative mt-4 p-[2px] rounded-md  bg-blue-500   bg-gradient-to-r from-pink-400 via-slate-600 to-pink-300 animate-bounce-spin">
    <div className="px-4 py-2 bg-gradient-to-r from-pink-400 to-pink-300 text-white font-medium text-sm rounded-md shadow-md border-[5px] ">
      🌍 <span className="font-bold text-emerald-800 animate-pulse">{userCount ?? '...'}</span> travelers are already planning their dream trips — <span className="font-bold text-emerald-800  animate-pulse hover:text-pink-700 transition">join them today!</span>
    </div>
  </div>
  

  );
};

export default UserStats;
