import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      // Save the current path the user is trying to access
      localStorage.setItem("redirectPath", location.pathname);
      navigate("/login"); // Navigate to login
    }
  }, [token, navigate, location]);

  return token ? children : null;
};

export default ProtectedRoute;
