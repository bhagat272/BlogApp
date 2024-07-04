// components/BlogDetailsPage.js
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogById, incrementLikes } from '../redux/slices.js/blogSlice';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blog = useSelector((state) => state.blogs.selectedBlog);
  const status = useSelector((state) => state.blogs.status);
  const error = useSelector((state) => state.blogs.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [dispatch, id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLikeClick = () => {
    if (id) {
      // Assuming the userId is hardcoded for demonstration purposes. Replace with dynamic user ID as needed.
      const userId = '60f6c58f2abf5e4b5cd28f36'; // Replace this with actual logged-in user ID
      dispatch(incrementLikes({ id, userId }));
    }
  };

  if (status === 'loading') return <div className="text-center mt-10">Loading...</div>;
  if (status === 'failed') return <div className="text-center mt-10">Error: {error}</div>;
  if (!blog) return <div className="text-center mt-10">No blog found.</div>;

  return (
    <div className="min-h-screen bg-gray-300 py-8">
      <div className="container mx-auto px-4">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-200 mb-6" 
          onClick={handleBackClick}
        >
          &larr; Back
        </button>
        <div className="bg-white p-8 rounded-lg shadow-lg mx-4">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-500 mb-4">
            {blog.author} - {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <div 
            className="prose prose-lg mb-4"
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
          <div className="flex items-center">
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-200" 
              onClick={handleLikeClick}
            >
              👍 Like {blog.likes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
