import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isRegistered } = useAuth();
  const userSession = localStorage.getItem('userSession');

  return (isRegistered || userSession) ? children : <Navigate to="/register" />;
};

export default ProtectedRoute;
