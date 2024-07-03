import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../redux/slices.js/blogSlice';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const HomePage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  console.log(blogs)
  const blogStatus = useSelector((state) => state.blogs.status);

  useEffect(() => {
    if (blogStatus === 'idle') {
      dispatch(fetchBlogs());
    }
  }, [blogStatus, dispatch]);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Featured Blogs</Typography>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                </Typography>
                <Typography variant="body2">{blog.excerpt}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
