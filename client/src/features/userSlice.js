import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Stores the current user's data (uid, email, fullName)
  loading: false, // Tracks loading state (e.g., during login or sign-up)
  error: null, // To store any error messages during authentication
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to start loading state (for async actions like login/sign up)
    setLoading: (state) => {
      state.loading = true;
      state.error = null; // Reset error when starting a new authentication request
    },
    // Action to stop loading state (successful authentication or error)
    stopLoading: (state) => {
      state.loading = false;
    },
    // Set the user data after a successful sign-up or login
    setUser: (state, action) => {
      state.user = action.payload; // Payload should contain { uid, email, fullName }
      state.loading = false; // Stop loading after setting the user
      state.error = null; // Clear any previous errors
    },
    // Set the error state (e.g., incorrect email/password)
    setError: (state, action) => {
      state.error = action.payload; // Store the error message
      state.loading = false; // Stop loading if there's an error
    },
    // Action to logout and clear the user data
    logout: (state) => {
      state.user = null; // Clear user data
      state.loading = false; // Stop loading on logout
      state.error = null; // Clear any errors on logout
    },
  },
});

// Exporting actions for dispatching
export const { setLoading, stopLoading, setUser, setError, logout } = userSlice.actions;

// Export the reducer to be included in the store
export default userSlice.reducer;
