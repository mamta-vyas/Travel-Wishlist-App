import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ cities, loading }) => {
    
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
          {city.name && city.latitude && city.longitude && (
  <div className="mt-4 text-right">
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
  </div>
)}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
