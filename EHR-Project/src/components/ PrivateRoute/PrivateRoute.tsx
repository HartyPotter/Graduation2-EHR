import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const accessToken = Cookies.get("accessToken");

  // If there is no accessToken, redirect to login
  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return <>{element}</>;
};

export default PrivateRoute;