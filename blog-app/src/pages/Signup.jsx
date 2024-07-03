import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/slices.js/authSlice'; // Corrected path
import { Link, useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material'; // Import Snackbar and Alert components

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false); // State for controlling Snackbar visibility

  // Accessing error and status state from Redux
  const { error, status } = useSelector((state) => state.auth);

  const handleSignup = () => {
    console.log('Signup data:', { name, email, password }); // Debugging log
    dispatch(signupUser({ name, email, password }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      // Show Snackbar on successful signup
      setShowSnackbar(true);
      // Clear the form
      setName('');
      setEmail('');
      setPassword('');
      // Redirect to login or dashboard after a short delay
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after successful signup
      }, 2000); // Adjust the delay as needed
    } else if (status === 'failed') {
      alert(error); // Displaying the error message (You can customize this as needed)
    }
  }, [status, error, navigate]);

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleSignup}
          disabled={!name || !email || !password}
        >
          Sign Up
        </button>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p className="text-red-500">{error}</p>} {/* Display error */}
        <p>Already have an account? <Link to={'/login'}>Login Here</Link></p>
      </div>

      {/* Snackbar for success notification */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000} // Adjust the duration as needed
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Signup successful! Redirecting...
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signup;
