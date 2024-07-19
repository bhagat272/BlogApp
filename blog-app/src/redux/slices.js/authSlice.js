import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const baseURL = process.env.REACT_APP_BACKEND_API;

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  token: localStorage.getItem("token"),
  author: null, // Add this to store author information
};

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/api/login`, { email, password });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { error: error.message });
  }
});

export const signupUser = createAsyncThunk('auth/signupUser', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/api/register`, { name, email, password });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { error: error.message });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state , action){
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.author = action.payload.author;
      },
    logoutUser (state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.author = null;
      localStorage.removeItem('author'); // Remove author info from localStorage
      localStorage.removeItem('token'); // Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = action.payload.error ? action.payload.error : null;

        // Decode the token to get author information
        const decodedToken = jwtDecode(action.payload.token);
        state.author = decodedToken.author;

        // Store the author information and token in localStorage
        localStorage.setItem('author', decodedToken.author);
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.error || action.error.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.error = action.payload.error ? action.payload.error : null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.error || action.error.message;
      });
  },
});

export const { logoutUser , setAuth } = authSlice.actions;

export default authSlice.reducer;
