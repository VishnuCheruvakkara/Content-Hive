import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function PublicRouteProtection() {
  const { isAuthenticated,isAdmin } = useAuth();

  if (isAuthenticated) {
    return isAdmin
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/user/dashboard" replace />;
  }

  return <Outlet />; 
}

export default PublicRouteProtection;