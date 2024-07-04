import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../redux/slices.js/blogSlice';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const blogStatus = useSelector((state) => state.blogs.status);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    console.log(blogStatus)
    if (blogStatus === 'idle' ) {
      dispatch(fetchBlogs());
    }
  }, [blogStatus, dispatch]);

  // Function to handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter blogs by category
  const filteredBlogs = blogs.filter(blog => {
    if (selectedCategory === 'all') {
      return true; // show all blogs
    } else {
      return blog.category === selectedCategory;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Home</h1>

      {/* Category filter */}
      <div className="mb-6">
        <span className="text-gray-700 mr-2">Filter by Category:</span>
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
          className={`px-3 py-1 rounded-lg text-sm ${selectedCategory === 'lifestyle' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
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
                <Link to={`/blog/${blog._id}`} className="text-blue-600 hover:text-blue-800 transition-colors duration-200">{blog.title}</Link>
              </h2>
              <p className="text-gray-700">{blog.excerpt}</p>
              <div className="mt-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-lg">{blog.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
