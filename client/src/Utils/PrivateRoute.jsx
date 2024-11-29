/* eslint-disable */
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Store/AuthStore";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/auth/login") {
      <Navigate to="/login" replace />;
    }
  }, [isAuthenticated, location]);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default PrivateRoute;
