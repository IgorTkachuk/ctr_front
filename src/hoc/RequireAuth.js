import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorAuth } from "../redux/auth/selector";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { status: authStatus } = useSelector(selectorAuth);

  if (authStatus !== "SUCCESS") {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
