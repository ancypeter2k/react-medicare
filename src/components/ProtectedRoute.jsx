import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth); // State will get from store.js

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children; // If authenticated - render to child (Dashboard)
}

export default ProtectedRoute;