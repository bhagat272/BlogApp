import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const author = localStorage.getItem('author');
    const token = localStorage.getItem('token');

    if (!token && !author) {
        return <Navigate to="/login" />;
    }
     
    return <Outlet />;
};

export default PrivateRoute;