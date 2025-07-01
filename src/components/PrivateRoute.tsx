import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>; // Or a more sophisticated loading spinner
  }

  if (!token) {
    // Redirect them to the /login page, but save the current URL they tried to go to
    // so they can be redirected there after logging in.
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
