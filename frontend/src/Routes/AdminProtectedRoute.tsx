import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

interface AdminProtectedRoute {
  children: React.ReactElement;
  role: string[];
}

const AdminProtectedRoute: React.FC<AdminProtectedRoute> = ({ children, role }) => {
  const { isAuthenticated, userRole } = useAuth();
  useEffect(() => {
    if (userRole !== "admin") {
      toast.error("You must be admin");
    }
  }, [userRole]);
  return isAuthenticated && role.includes(userRole|| '')? children : <Navigate to="/" />;
};

export default AdminProtectedRoute;