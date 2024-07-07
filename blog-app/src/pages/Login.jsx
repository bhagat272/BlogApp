import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices.js/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, status, error } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  
  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user || token) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const author = localStorage.getItem('author');
    if (token && author) {
      console.log('User is already logged in with author:', author);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white bg-opacity-10 backdrop-blur-sm p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Login</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        {status === 'failed' && <div className="mt-4 text-sm text-red-600">{error}</div>}
        <button
          onClick={handleLogin}
          disabled={status === 'loading'}
          className={`w-full px-4 py-2 mt-6 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-center text-white">New User? <Link className="hover:underline" to="/">Signup</Link></p>
      </div>
    </div>
  );
};

export default Login;
