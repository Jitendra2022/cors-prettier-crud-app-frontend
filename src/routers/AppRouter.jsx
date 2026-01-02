import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "../pages/About";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Registration from "../pages/Registration";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";
import ResetPassword from "../pages/ResetPassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/registration", element: <Registration /> },
      { path: "/login", element: <Login /> },
      { path: "/about", element: <About /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/verify-otp", element: <VerifyOtp /> },
      { path: "/reset-password", element: <ResetPassword /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "/dashboard", element: <Dashboard /> }],
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;
