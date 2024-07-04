import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-sm p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-center">User Dashboard</h1>
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
          <Link to="/auth-blogs">
            <button className="w-full sm:w-48 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              Your Blogs
            </button>
          </Link>
          <Link to="/createblog">
            <button className="w-full sm:w-48 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
              Create Blog
            </button>
          </Link>
          <Link to="/home">
            <button className="w-full sm:w-48 px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-700 transition duration-300">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
