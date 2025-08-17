import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

// Protected route component - only accessible with valid JWT
export default function PrivateRoute({ children }) {
  const { userState } = useContext(AuthContext);

  // Check both localStorage token and global authentication state
  const token = localStorage.getItem("token");

  // Redirect to login if no token or user not authenticated
  if (!token || !userState.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children; // Render protected component if authenticated
}
