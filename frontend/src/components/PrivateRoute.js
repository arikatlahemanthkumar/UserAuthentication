import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

export default function PrivateRoute({ children }) {
  const { userState } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  if (!token || !userState.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
