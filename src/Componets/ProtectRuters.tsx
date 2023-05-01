import PropTypes from "prop-types";
import { ReactElement, ReactNode } from "react";
import { useUserSlice } from "../redux/slices";
import { Navigate, Outlet } from "react-router";

interface ProtectRuterPorp {
  children: ReactElement;
}

function ProtectRuters() {
  const userLogin = useUserSlice();

  return userLogin.id ? <Outlet/> : <Navigate replace to={"/login"} />;
}

export default ProtectRuters;
