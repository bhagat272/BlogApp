import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_API || 'http://localhost:5000/';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/api/login`, { email, password });
    console.log(response.data)   
    return response.data;
  } catch (error) {
    console.error('Login error response:', error.response?.data || error.message); // Log error response
    return rejectWithValue(error.response?.data || { error: error.message });
  }
});

export const signupUser = createAsyncThunk('auth/signupUser', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    console.log('Attempting signup at:', `${baseURL}api/register`); // Debugging log
    const response = await axios.post(`${baseURL}/api/register`, { name, email, password });
    console.log('Signup response:', response.data); // Debugging log
    return response.data;
  } catch (error) {
    console.log('Signup error:', error.response?.data || { error: error.message }); // Log error details
    return rejectWithValue(error.response?.data || { error: error.message });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
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
        state.error = action.payload.error ? action.payload.error : null;
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

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
