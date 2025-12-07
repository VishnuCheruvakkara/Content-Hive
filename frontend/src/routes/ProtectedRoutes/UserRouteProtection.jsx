import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function UserRouteProtection() {
  const { isAuthenticated, isAdmin, bootstrapped } = useAuth();
  if (!bootstrapped) return <Spinner />;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}

export default UserRouteProtection;