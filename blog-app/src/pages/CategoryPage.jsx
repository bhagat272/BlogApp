import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const CategoryPage = () => {
  const { category } = useParams();
  const blogs = useSelector((state) => state.blogs.blogs.filter(blog => blog.category === category));

  return (
    <Container>
      <Typography variant="h3" gutterBottom>{category} Blogs</Typography>
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

export default CategoryPage;
