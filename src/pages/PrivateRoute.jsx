import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Check Redux state for login status
  const location = useLocation();

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to="/user" state={{ from: location }} replace true />;
  }

  // If the user is logged in, render the protected component
  return children || <Outlet />;
};

export default PrivateRoute;
