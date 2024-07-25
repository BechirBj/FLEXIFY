import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

interface AdminProtectedRouteProps {
  children: React.ReactElement;
  role: string[];
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children, role }) => {
  const { isAuthenticated, userRole } = useAuth();
  const localStorageRole = localStorage.getItem("role");


    if (localStorageRole && !role.includes(localStorageRole)) {
    return <Navigate to="/" />;
    }

  if (!isAuthenticated || !localStorageRole || !role.includes(localStorageRole)) {
    return <Navigate to="/settings" />;
  }

  return children;
};

export default AdminProtectedRoute;