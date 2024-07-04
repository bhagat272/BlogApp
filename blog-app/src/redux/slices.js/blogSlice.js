import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_API || 'http://localhost:5000/';

const initialState = {
  blogs: [],
  authorBlogs: [], // Add this line for storing blogs specific to the author
  selectedBlog: null,
  status: 'idle',
  error: null,
};

// Thunk to fetch all blogs
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await axios.get(`${baseURL}/api/allblog`);
  return response.data;
});

// Thunk to create a new blog
export const createBlog = createAsyncThunk('blogs/createBlog', async (blog) => {
  const response = await axios.post(`${baseURL}/api/createblog`, blog);
  return response.data;
});

// Thunk to fetch a blog by its ID
export const fetchBlogById = createAsyncThunk('blogs/fetchBlogById', async (id) => {
  const response = await axios.get(`${baseURL}/api/blog/${id}`);
  return response.data;
});

// Thunk to fetch blogs by author
export const fetchBlogByAuthor = createAsyncThunk('blogs/fetchBlogByAuthor', async (author) => {
  const response = await axios.get(`${baseURL}/api/author/${author}`);
  return response.data;
});

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all blogs
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
      
      // Create a new blog
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      
      // Fetch a single blog by ID
      .addCase(fetchBlogById.pending, (state) => {
        state.status = 'loading';
        state.selectedBlog = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // Fetch blogs by author
      .addCase(fetchBlogByAuthor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogByAuthor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.authorBlogs = action.payload;
      })
      .addCase(fetchBlogByAuthor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default blogsSlice.reducer;
