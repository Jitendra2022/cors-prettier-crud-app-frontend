import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { auth, loading } = useContext(AuthContext);
  // Wait until auth finishes loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">
          Checking session...
        </p>
      </div>
    );
  }

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
