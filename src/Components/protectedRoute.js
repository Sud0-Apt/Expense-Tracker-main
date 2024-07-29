// src/components/ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user === false) {
    return <Navigate to="/login" />;
  }

  return user === null ? <div>Loading...</div> : children;
};

export default ProtectedRoute;
