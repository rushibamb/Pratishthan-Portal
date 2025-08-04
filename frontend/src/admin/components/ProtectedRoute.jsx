import React from 'react';
import { Navigate } from 'react-router-dom';

// This component acts as a guard for our admin routes.
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');

  // **FIX: More robust check for a valid token.**
  // This now checks for null, undefined, and the literal string "undefined",
  // which can sometimes be stored by mistake.
  if (!token || token === 'undefined') {
    return <Navigate to="/admin/login" replace />;
  }

  // If a valid token exists, render the child components.
  return children;
};

export default ProtectedRoute;
