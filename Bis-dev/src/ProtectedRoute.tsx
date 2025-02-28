import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({
  isLoggedIN,
  children,
}: {
  isLoggedIN: boolean;
  children: React.ReactNode;
}) => {
  const { isLoggedIN: authState } = useAuth();

  return isLoggedIN || authState ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
