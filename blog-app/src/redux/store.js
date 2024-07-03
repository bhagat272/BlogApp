import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from '../redux/slices.js/blogSlice';
import { themeReducer } from '../redux/slices.js/themeSlice'; // Update this line
import authReducer from '../redux/slices.js/authSlice';

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    theme: themeReducer,
    auth: authReducer,
  },
});