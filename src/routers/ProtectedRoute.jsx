import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// ===============================
// Protected Route Component
// ===============================
// This component restricts access to routes
// and allows only authenticated users
// ===============================

const ProtectedRoute = () => {
  const { auth, loading } = useContext(AuthContext);

  // ===============================
  // Loading State
  // ===============================
  // Wait until authentication check
  // (refresh token API call) is finished
  // ===============================
  if (loading) {
    return <div>Loading...</div>;
  }

  // ===============================
  // Unauthorized Access
  // ===============================
  // If user is not authenticated,
  // redirect to login page
  // ===============================
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  // ===============================
  // Authorized Access
  // ===============================
  // If user is authenticated,
  // render the protected route
  // ===============================
  return <Outlet />;
};

export default ProtectedRoute;
