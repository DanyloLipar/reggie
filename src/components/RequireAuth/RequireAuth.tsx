import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../core/store/index";

const RequireAuth = () => {
  const currentUser = JSON.parse(localStorage.getItem("savedUser") || "{}");
  const location = useLocation();

  if (currentUser?.userLevel === 2) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
