import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/v1/login", formData, {
        withCredentials: true,
      });
      setAuth({
        accessToken: res.data.accessToken,
        role: res.data.user.role,
        name: res.data.user.name,
      });
      toast.success(res.data.message);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      // Show a readable error
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-green-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition cursor-pointer"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/registration" className="text-green-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
