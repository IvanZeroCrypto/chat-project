import { type FC, type ReactNode } from "react";
import authStore from "../../store/AuthStore";
import { Navigate } from "react-router-dom";

interface IProtectedRouteAuth {
  children: ReactNode;
}

const ProtectedRouteAuth: FC<IProtectedRouteAuth> = ({ children }) => {
  const { isAuth } = authStore();

  if (isAuth) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default ProtectedRouteAuth;
