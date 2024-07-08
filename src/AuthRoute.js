import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

function AuthRoute() {
  const auth = localStorage.getItem("user");

  if (!auth) {
    toast.error("Please sign in first");
    return <Navigate to="/SignIn" />;
  }

  return <Outlet />;

  // return(
  //     auth? <Outlet/>:<Navigate to="/SignIn"/>
  // );
}

export default AuthRoute;
