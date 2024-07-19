import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, incrementLikes } from '../redux/slices.js/blogSlice'; // Import incrementLikes action
import { Link } from 'react-router-dom';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Import heart outline icon
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import filled heart icon

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const blogs = useSelector((state) => state.blogs.blogs);
  const blogStatus = useSelector((state) => state.blogs.status);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (blogStatus === 'idle') {
      dispatch(fetchBlogs());
    }
  }, [blogStatus, dispatch]);

  // Function to handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Function to handle like click
  const handleLikeClick = (blog) => {
    if (!blog.isLiked) {
      dispatch(incrementLikes({ id: blog._id, userId: blog.userId }));
    } else {
      // Handle unlike logic here if needed
    }
  };

  // Filter blogs by category
  const filteredBlogs = blogs.filter((blog) => {
    if (selectedCategory === 'all') {
      return true; // show all blogs
    } else {
      return blog.category === selectedCategory;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Back button and ThemeSwitcher */}
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)} // Go back to the previous page
          startIcon={<ArrowBackIosNewIcon />} // Add the arrow icon
          sx={{
            fontSize: '16px',
            padding: '8px 16px',
            backgroundColor: '#f0f4f8',
            borderColor: '#007bff',
            color: '#007bff',
            '&:hover': {
              backgroundColor: '#e0e7ef',
              borderColor: '#0056b3',
            },
            display: 'flex',
            alignItems: 'center',
            gap: '8px', // Space between icon and text
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px', // Rounded corners
            textTransform: 'none', // Prevent uppercase transformation
          }}
        >
          Back
        </Button>
        
        <ThemeSwitcher />

      </div>

      {/* Page title */}
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-600">Home</h1>

      {/* Category filter */}
      <div className="mb-6 text-center">
        <span className="text-gray-600 mr-2">Filter by Category:</span>
        <button
          className={`mr-2 px-3 py-1 rounded-lg text-sm ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
          onClick={() => handleCategoryChange('all')}
        >
          All
        </button>
        <button
          className={`mr-2 px-3 py-1 rounded-lg text-sm ${selectedCategory === 'technology' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
          onClick={() => handleCategoryChange('technology')}
        >
          Technology
        </button>
        <button
          className={`px-3 py-1 rounded-lg text-sm ${selectedCategory === 'Lifestyle' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
          onClick={() => handleCategoryChange('Lifestyle')}
        >
          Lifestyle
        </button>
      </div>

      {/* Blog grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <div key={blog._id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">
                <Link to={`/blog/${blog._id}`} className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  {blog.title}
                </Link>
              </h2>
              <p className="text-gray-700">{blog.excerpt}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-lg">{blog.category}</span>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">{blog.likes} Likes</span>
                  {/* Conditional rendering for heart icon */}
                  {blog.isLiked ? (
                    <FavoriteIcon
                      color="secondary"
                      fontSize="small"
                      onClick={() => handleLikeClick(blog)} // Call handleLikeClick with blog object
                      style={{ cursor: 'pointer' }} // Change cursor to pointer on hover
                    />
                  ) : (
                    <FavoriteBorderIcon
                      color="secondary"
                      fontSize="small"
                      onClick={() => handleLikeClick(blog)} // Call handleLikeClick with blog object
                      style={{ cursor: 'pointer' }} // Change cursor to pointer on hover
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
