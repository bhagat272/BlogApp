import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../redux/slices.js/blogSlice';
import { Container, Typography, Button, TextField, Alert, IconButton, Snackbar } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
 
const CreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [showSnackbar, setShowSnackbar] = useState(false); // State for controlling Snackbar visibility

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [user]);

  const handleCreateBlog = () => {
    if (user && user.name) {
      dispatch(createBlog({ title, content, category, author: user.email }))
        .unwrap() // Unwraps the result to handle the resolved or rejected state
        .then(() => {
          // Show Snackbar on successful blog creation
          setShowSnackbar(true);
          // Clear the form
          setTitle('');
          setContent('');
          setCategory('');
          // Redirect after a delay to allow Snackbar to display
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000); // Adjust the delay as needed
        })
        .catch((error) => {
          console.error('Failed to create blog:', error);
        });
    } else {
      console.error('User not authenticated.');
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  if (!token) {
    return (
      <Container>
        <Alert severity="error">You must be logged in to create a blog.</Alert>
      </Container>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6">
      
      <Container className="mx-auto my-8 px-8 py-12 bg-white rounded-lg shadow-xl max-w-4xl relative">
        <IconButton
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
        >
          <ArrowBack fontSize="large" color='primary' />
        </IconButton>
        <Typography variant="h3" className="text-4xl font-bold mb-8 text-center text-indigo-600">
          Create a New Blog
        </Typography>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          className="mb-6"
          InputProps={{
            className: "border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          }}
          InputLabelProps={{
            className: "text-gray-500"
          }}
        />
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          margin="normal"
          className="mb-6"
          InputProps={{
            className: "border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          }}
          InputLabelProps={{
            className: "text-gray-500"
          }}
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          className="mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          style={{ minHeight: '200px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateBlog}
          disabled={!title || !content || !category}
          className="px-6 py-3 bg-indigo-800 text-white rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Create Blog
        </Button>
      </Container>

      {/* Snackbar for success notification */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000} // Adjust the duration as needed
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Blog created successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateBlog;
