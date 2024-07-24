import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  role: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { isAuthenticated, userRole } = useAuth();
  return isAuthenticated && role.includes(userRole|| '')? children : <Navigate to="/" />;
};

export default ProtectedRoute;
