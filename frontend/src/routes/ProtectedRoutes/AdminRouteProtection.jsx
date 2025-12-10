import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function AdminRouteProtection() {
  const { isAuthenticated,isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/user/dashboard" replace />; 
  }

  return <Outlet />; 
}

export default AdminRouteProtection;