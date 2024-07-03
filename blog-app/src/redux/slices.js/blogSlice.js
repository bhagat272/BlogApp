import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  blogs: [],
  selectedBlog: null, // Add this line for storing the single blog
  status: 'idle',
  error: null,
};

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/allblog`);
  return response.data;
});

export const createBlog = createAsyncThunk('blogs/createBlog', async (blog) => {
  const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/createblog`, blog);
  return response.data;
});

export const fetchBlogById = createAsyncThunk('blogs/fetchBlogById', async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/blog/${id}`);
  return response.data;
});

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(fetchBlogById.pending, (state) => { // Handle pending state for fetching a single blog
        state.status = 'loading';
        state.selectedBlog = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => { // Handle the fetched single blog
        state.status = 'succeeded';
        state.selectedBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => { // Handle errors for fetching a single blog
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default blogsSlice.reducer;
