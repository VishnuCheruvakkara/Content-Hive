import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function AdminRouteProtection() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />; 
}

export default AdminRouteProtection;