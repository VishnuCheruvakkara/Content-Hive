import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function PublicRouteProtection() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/user/dashboard" replace />; 
  }

  return <Outlet />; 
}

export default PublicRouteProtection;