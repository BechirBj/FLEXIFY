import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Routes/AuthContext';

interface AuthProtectedRouteProps {
  children: React.ReactElement;
}

const AuthProtectedRoute: React.FC<AuthProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthProtectedRoute;
