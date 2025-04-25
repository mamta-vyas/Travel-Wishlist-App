import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const city = action.payload;
      const exists = state.wishlist.find((item) => item.id === city.id);
      if (!exists) {
        state.wishlist.push(city);
      }
    },
    removeFromWishlist: (state, action) => {
      const cityId = action.payload;
      state.wishlist = state.wishlist.filter((item) => item.id !== cityId);
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
