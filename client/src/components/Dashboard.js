import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../features/wishlistSlice'; // make sure the path is correct

const Dashboard = ({ cities, loading }) => {
  const dispatch = useDispatch();

  if (cities && cities.length > 0) {
    console.log(cities[0].name, cities[0].latitude, cities[0].longitude);
  }

  if (loading) return <p className="text-center text-lg text-blue-700 font-semibold">Loading cities...</p>;
  if (!cities || cities.length === 0) return <p className="text-center text-gray-600 italic">No cities to display.</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6 px-4">
      {cities.map((city) => (
        <div
          key={city.id}
          className="bg-white border rounded-xl p-4 shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold text-blue-700 mb-2">{city.name}</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>Population:</strong> {city.population?.toLocaleString() ?? 'N/A'}</li>
            <li><strong>Latitude:</strong> {city.latitude}</li>
            <li><strong>Longitude:</strong> {city.longitude}</li>
            <li><strong>Elevation (m):</strong> {city.elevationMeters ?? 'N/A'}</li>
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <Link
              to={`/destination/${city.id}`}
              state={{
                cityName: city.name,
                lat: city.latitude,
                lon: city.longitude,
              }}
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
            >
              View More
            </Link>
            <button
              onClick={() => dispatch(addToWishlist(city))}
              className="ml-2 inline-block bg-pink-600 hover:bg-pink-700 text-white px-3 py-1.5 rounded-md transition"
            >
              Wishlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
