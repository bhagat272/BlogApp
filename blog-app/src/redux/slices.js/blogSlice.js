// redux/slices/blogSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_API || 'http://localhost:5000';

const initialState = {
  blogs: [],
  selectedBlog: null,
  status: 'idle',
  error: null,
  authorBlogs : []    
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

// Thunk to increment likes
export const incrementLikes = createAsyncThunk('blogs/incrementLikes', async ({ id, userId }) => {
  const response = await axios.patch(`${baseURL}/api/blog/${id}/like`, { userId });
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
      .addCase(fetchBlogByAuthor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogByAuthor.fulfilled, (state, action) => {
        state.status = 'idle';
        state.authorBlogs = action.payload;
      })
      .addCase(fetchBlogByAuthor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(incrementLikes.fulfilled, (state, action) => {
        if (state.selectedBlog && state.selectedBlog._id === action.payload._id) {
          state.selectedBlog.likes = action.payload.likes;
        }
        const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index].likes = action.payload.likes;
        }
      });
  },
});

export default blogsSlice.reducer;
