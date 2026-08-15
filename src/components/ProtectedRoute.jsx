import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

export const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useProfile();
  const location = useLocation();

  if (!isSignedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;