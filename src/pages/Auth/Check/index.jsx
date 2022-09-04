import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function Check({ children, auth, noAuth, role }) {
  const { auth_checked, isLoggedIn, user } = useSelector((state) => state.auth);

  if (auth) {
    if (auth_checked && isLoggedIn) {
      if (role && role.length > 0) {
        if (role.includes(user.role)) return children;
        return <Navigate to="/" />;
      }
      return children;
    }
    return <Navigate to="/login" />;
  }

  if (noAuth && auth_checked && isLoggedIn) {
    if (user.role === "agent" || user.role === "sub agent")
      return <Navigate to="/categories" />;
    return <Navigate to="/" />;
  }

  return children;
}
