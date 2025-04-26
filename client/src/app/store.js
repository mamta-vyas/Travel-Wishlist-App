import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Local storage
import userReducer from '../features/userSlice';
import wishlistReducer from '../features/wishlistSlice';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['wishlist'], // Only persist the wishlist
};

const persistedWishlistReducer = persistReducer(persistConfig, wishlistReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
    wishlist: persistedWishlistReducer,
  },
});

export const persistor = persistStore(store);
