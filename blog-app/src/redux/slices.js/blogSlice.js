import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_API;

const initialState = {
  blogs: [],
  selectedBlog: null,
  status: 'idle',
  error: null,
  authorBlogs: [],
};

// Thunk to fetch all blogs
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  try {
    const response = await axios.get(`${baseURL}/api/allblog`);
    return response.data;
  } catch (error) {
    throw Error('Failed to fetch blogs');
  }
});

// Thunk to create a new blog
export const createBlog = createAsyncThunk('blogs/createBlog', async (blog, thunkAPI) => {
  try {
    const response = await axios.post(`${baseURL}/api/createblog`, blog);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); // Return error message from server
  }
});

// Thunk to fetch a blog by its ID
export const fetchBlogById = createAsyncThunk('blogs/fetchBlogById', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${baseURL}/api/blog/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); // Return error message from server
  }
});

// Thunk to fetch blogs by author
export const fetchBlogByAuthor = createAsyncThunk('blogs/fetchBlogByAuthor', async (author, thunkAPI) => {
  try {
    const response = await axios.get(`${baseURL}/api/author/${author}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); // Return error message from server
  }
});

// Thunk to delete a blog by its ID
export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id, thunkAPI) => {
  try {
    await axios.delete(`${baseURL}/api/blog/${id}`);
    return id; // Return the deleted blog's ID to update the state
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); // Return error message from server
  }
});

// Thunk to update a blog
export const updateBlog = createAsyncThunk('blogs/updateBlog', async ({ id, updatedBlog }, thunkAPI) => {
  try {
    const response = await axios.put(`${baseURL}/api/blog/${id}`, updatedBlog);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); // Return error message from server
  }
});

// Thunk to increment likes
export const incrementLikes = createAsyncThunk('blogs/incrementLikes', async ({ id, userId }) => {
  try {
    const response = await axios.patch(`${baseURL}/api/blog/${id}/like`, { userId });
    return response.data;
  } catch (error) {
    throw Error('Failed to increment likes');
  }
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
      .addCase(createBlog.rejected, (state, action) => {
        state.error = action.payload || 'Failed to create blog';
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
        state.error = action.payload || 'Failed to fetch blog by ID';
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
        state.error = action.payload || 'Failed to fetch blogs by author';
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
        state.authorBlogs = state.authorBlogs.filter(blog => blog._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete blog';
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        const authorIndex = state.authorBlogs.findIndex(blog => blog._id === action.payload._id);
        if (authorIndex !== -1) {
          state.authorBlogs[authorIndex] = action.payload;
        }
        state.selectedBlog = action.payload;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update blog';
      })
      .addCase(incrementLikes.pending, (state) => {
        // Handle pending state if needed
      })
      .addCase(incrementLikes.fulfilled, (state, action) => {
        if (state.selectedBlog && state.selectedBlog._id === action.payload._id) {
          state.selectedBlog.likes = action.payload.likes;
        }
        const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index].likes = action.payload.likes;
        }
      })
      .addCase(incrementLikes.rejected, (state, action) => {
        // Handle error state if needed
      });
  },
});

export default blogsSlice.reducer;
