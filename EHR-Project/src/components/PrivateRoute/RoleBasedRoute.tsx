import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../UserContext";

interface RoleBasedRouteProps {
  element: JSX.Element;
  allowedRoles: string; // Array of roles allowed to access this route
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ element, allowedRoles }) => {
  const { user } = useUser();
  console.log("User in RoleBasedRoute:", user);
  // If the authentication state is still loading, show a loading spinner or message

  // If the user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user's role is not allowed, redirect to a "not authorized" page or home
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/not-authorized" />;
  }

  // If the user's role is allowed, render the element
  return element;
};

export default RoleBasedRoute;