const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="max-w-2xl text-center bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">About Travel Wishlist 🌍</h1>
        <p className="text-gray-700 text-lg">
          Welcome to <span className="font-semibold text-blue-600">Travel Wishlist</span> – your personal space to dream, plan, and organize all the amazing destinations you want to explore.
        </p>
        <p className="text-gray-600 mt-4">
          Whether it's a mountain trek, a cozy cabin, or a tropical island getaway, this app helps you keep track of all the places that inspire you. Start creating your wishlist and turn your travel dreams into reality!
        </p>
      </div>
    </div>
  );
};

export default About;
