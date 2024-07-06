import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import CategoryPage from './pages/CategoryPage';
import Dashboard from './pages/Dashboard';
import { useSelector } from 'react-redux';
import { selectTheme } from './redux/slices.js/themeSlice';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateBlog from './pages/CreateBlog';
import AuthorBlogs from './pages/AuthorBlogs';

const App = () => {
  const themeMode = useSelector(selectTheme);
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Signup/>}/> 
        <Route path='/login' element={<Login/>}/>
        <Route path='/createblog' element={<CreateBlog/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth-blogs" element={<AuthorBlogs/>}/>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
