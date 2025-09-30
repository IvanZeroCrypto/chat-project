import { type FC, type ReactNode } from "react";
import authStore from "../../store/AuthStore";
import { Navigate } from "react-router-dom";

interface IProtectedRoute {
  children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const { isAuth } = authStore();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
