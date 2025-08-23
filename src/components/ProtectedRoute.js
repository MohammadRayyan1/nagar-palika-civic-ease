// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user")); // check if user is logged in

  if (!user) {
    return <Navigate to="/login" replace />; // redirect to login if not logged in
  }

  return children; // render the protected page
}

export default ProtectedRoute;