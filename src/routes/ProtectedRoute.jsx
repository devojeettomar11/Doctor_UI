import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../features/auth/store/authStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // If children are passed, render them, otherwise render the Outlet for nested routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
