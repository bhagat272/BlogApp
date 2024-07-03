import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogById } from '../redux/slices.js/blogSlice';
import { Container, Typography } from '@mui/material';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs.selectedBlog); // Use a specific key for the single blog
  const status = useSelector((state) => state.blogs.status);
  const error = useSelector((state) => state.blogs.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id)); // Fetch the blog by ID when the component mounts
    }
  }, [dispatch, id]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  if (!blog) return <div>No blog found.</div>;

  return (
    <Container>
      <Typography variant="h3" gutterBottom>{blog.title}</Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {blog.author} - {new Date(blog.createdAt).toLocaleDateString()}
      </Typography>
      <Typography variant="body1" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </Container>
  );
};

export default BlogDetailsPage;
