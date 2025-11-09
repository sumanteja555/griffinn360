import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const isAdminLoggedIn = useSelector((state) => state.admin.isAdminLoggedIn); // Check Redux state for login status
  const location = useLocation();

  // If the user is not logged in, redirect to the login page
  if (!isAdminLoggedIn) {
    return (
      <Navigate to="/admin/adminuser" state={{ from: location }} replace />
    );
  }

  // If the user is logged in, render the protected component
  return children || <Outlet />;
};

export default AdminPrivateRoute;
