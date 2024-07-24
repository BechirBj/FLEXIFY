import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Routes/AuthContext';

interface AdminProtectedRouteProps {
  children: React.ReactElement;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();
    const role = localStorage.getItem('role');
  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
