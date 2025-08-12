// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If no user is logged in, redirect them to the login page
    return <Navigate to="/login" />;
  }

  // If a user is logged in, show the page they were trying to access
  return children;
}