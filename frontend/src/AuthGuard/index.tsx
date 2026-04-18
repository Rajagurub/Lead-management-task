import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const location = useLocation();

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}