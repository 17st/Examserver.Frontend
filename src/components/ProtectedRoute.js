import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Navigate only if the token is missing
    }
  }, [token, navigate]);

  // Render the children only if the token exists
  return token ? children : null;
};

export default ProtectedRoute;
