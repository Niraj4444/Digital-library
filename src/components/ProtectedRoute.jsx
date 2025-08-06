// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  // Get the current user from our AuthContext
  const { currentUser } = useAuth();

  // If there is NO currentUser, redirect them to the /login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If there IS a currentUser, show them the page they were trying to access
  return children;
};

export default ProtectedRoute;