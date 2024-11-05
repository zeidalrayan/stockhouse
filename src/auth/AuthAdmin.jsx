import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthAdmin = () => {
  const { user, role } = useAuth();
  const location = useLocation();
  const [keyuser, setkeyuser] = useState(
    localStorage.getItem("sb-wciaxcvrseypqzeyfgjc-auth-token")
  );
  return keyuser ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default AuthAdmin;
