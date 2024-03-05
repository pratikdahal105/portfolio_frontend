import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider.jsx'; 

export const PrivateRoute = ({ element }) => {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated } = auth;

  return isAuthenticated ? element : <Navigate to="/login" />;
};
