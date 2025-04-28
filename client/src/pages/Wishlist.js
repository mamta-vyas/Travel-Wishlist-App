import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../features/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const wishlist = useSelector(
    (state) => state.wishlist.wishlists[user?.uid] || []
  );

  // Load wishlist from localStorage on user login
  useEffect(() => {
    if (user?.uid) {
      const storedWishlist = localStorage.getItem(`wishlist_${user.uid}`);
      if (storedWishlist) {
        const parsedWishlist = JSON.parse(storedWishlist);
        parsedWishlist.forEach((city) => {
          dispatch(addToWishlist({ userId: user.uid, city }));
        });
      }
    }
  }, [dispatch, user?.uid]);

  // Save wishlist to localStorage whenever wishlist changes
  useEffect(() => {
    if (user?.uid) {
      localStorage.setItem(`wishlist_${user.uid}`, JSON.stringify(wishlist));
    }
  }, [wishlist, user?.uid]);

  // Handle removing a city from the wishlist
  const handleRemoveFromWishlist = (city) => {
    if (user?.uid) {
      dispatch(removeFromWishlist({ userId: user.uid, cityId: city.id }));
    }
  };

  // Handle clearing the wishlist
  const handleClearWishlist = () => {
    if (user?.uid) {
      dispatch(clearWishlist({ userId: user.uid }));
    }
  };

  return (
    <div className="p-">
      <h3 className="text-2xl font-bold mb-6 text-center">Your Wishlist</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id} // Use item.id as the unique key
            className="border p-4 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">
              {item.name}
            </h4>
            <p>
              <strong>Population:</strong>{" "}
              {item.population?.toLocaleString() ?? "N/A"}
            </p>
            <p>
              <strong>Latitude:</strong> {item.latitude ?? "N/A"}
            </p>
            <p>
              <strong>Longitude:</strong> {item.longitude ?? "N/A"}
            </p>
            <p>
              <strong>Elevation:</strong> {item.elevationMeters ?? "N/A"}
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleRemoveFromWishlist(item)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {wishlist.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleClearWishlist}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md">
            Clear Wishlist
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
