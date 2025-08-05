import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieScilce.js';
import authSlice from './authSlics.js';

export const store = configureStore({
  reducer: {
    movieData : movieReducer,
    auth : authSlice.reducer
  }
})