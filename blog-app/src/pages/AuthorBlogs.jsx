import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogByAuthor } from '../redux/slices.js/blogSlice';
import DOMPurify from 'dompurify';

const AuthorBlogs = () => {
  const dispatch = useDispatch();
  const { authorBlogs, status, error } = useSelector((state) => state.blogs);
  const author = localStorage.getItem('author'); // Retrieve author info from localStorage
  console.log(authorBlogs)
  useEffect(() => {
    console.log(author)
    if (author) {
      dispatch(fetchBlogByAuthor(author));
    }
  }, [author, dispatch]);

  if (status === 'loading') {
    return <div className="text-center mt-5 text-xl font-semibold">Loading blogs...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center mt-5 text-xl text-red-500 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Blogs by <span className="text-indigo-600">{author}</span></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {authorBlogs?.length === 0 ? (
          <div className="col-span-full text-center text-lg text-gray-600">No blogs found for this author.</div>
        ) : (
          authorBlogs?.map((blog) => (
            <div
              key={blog._id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              <h3 className="text-2xl font-semibold mb-4 text-indigo-700">{blog.title}</h3>
              <div
                className="text-gray-800 mb-4"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
              />
              <p className="mt-4 text-sm text-gray-500">Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AuthorBlogs;
