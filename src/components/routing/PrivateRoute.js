import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const auth = localStorage.getItem("authTokenCodit"); // returns true or false based on localStorage
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}
export default PrivateRoute;