import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import CategoryPage from './pages/CategoryPage';
import Dashboard from './pages/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from './redux/slices.js/themeSlice';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateBlog from './pages/CreateBlog';
import AuthorBlogs from './pages/AuthorBlogs';
import PrivateRoute from './components/PivateRoute';
import { setAuth } from './redux/slices.js/authSlice';
import { jwtDecode } from 'jwt-decode';

const App = () => {
  const themeMode = useSelector(selectTheme);
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchToken = async ()=>{
      const token = localStorage.getItem("token");
      const author = localStorage.getItem("author");
      if(token && author){
        const decodedToken = jwtDecode(token);
        dispatch(setAuth({token , author , user : decodedToken}))
      }
    }
    fetchToken();
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Signup/>}/> 
        <Route path='/login' element={<Login/>}/>
         <Route element={<PrivateRoute/>}>
         <Route path='/createblog' element={<CreateBlog/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/auth-blogs" element={<AuthorBlogs/>}/>
        
         </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
