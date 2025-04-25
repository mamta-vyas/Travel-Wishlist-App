import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../features/wishlistSlice'; // make sure path is correct

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">No destinations in wishlist.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {wishlist.map((city) => (
            <div key={city.id} className="border p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold text-blue-700">{city.name}</h3>
              <p className="text-sm text-gray-700">Population: {city.population?.toLocaleString() ?? 'N/A'}</p>
              <p className="text-sm text-gray-700">Latitude: {city.latitude}</p>
              <p className="text-sm text-gray-700">Longitude: {city.longitude}</p>
              <button
                onClick={() => dispatch(removeFromWishlist(city.id))}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
