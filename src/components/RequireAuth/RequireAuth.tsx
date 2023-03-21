import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../core/store/index";

const RequireAuth = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return null;
};

export default RequireAuth;
