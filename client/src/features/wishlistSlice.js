import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Store the wishlist for each user, keyed by user ID (uid)
  wishlists: {},
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { userId, city } = action.payload;

      // If the user doesn't have a wishlist, create one
      if (!state.wishlists[userId]) {
        state.wishlists[userId] = [];
      }

      // Check if the city is already in the user's wishlist
      const exists = state.wishlists[userId].find((item) => item.id === city.id);
      if (!exists) {
        state.wishlists[userId].push(city);  // Add to wishlist if not already there
      }
    },
    removeFromWishlist: (state, action) => {
      const { userId, cityId } = action.payload;

      // Remove the city from the user's wishlist if exists
      if (state.wishlists[userId]) {
        state.wishlists[userId] = state.wishlists[userId].filter((item) => item.id !== cityId);
      }
    },
    clearWishlist: (state, action) => {
      const { userId } = action.payload;

      // Clear the wishlist for the logged-in user
      if (state.wishlists[userId]) {
        state.wishlists[userId] = [];
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
