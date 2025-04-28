import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Stores the current user's data (uid, email, fullName)
  loading: false, // Tracks loading state (e.g., during login or sign-up)
  error: null, // To store any error messages during authentication
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, stopLoading, setUser, setError, logout } =
  userSlice.actions;

export default userSlice.reducer;
