import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../api/axiosInstance";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // extract email and phone
  const { email, phone } = location.state || {};
  const [newPassword, setNewPassword] = useState("");
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if ((!email && !phone) || !newPassword)
      return toast.error("Please enter new password");
    // Build body dynamically using ternary operator
    const emailOrPassword = email
      ? { email, newPassword }
      : { phone, newPassword };
    try {
      const res = await axiosInstance.post(
        "/api/v1/reset-password",
        emailOrPassword
      );
      toast.success(res.data.message || "Password reset successfully!");
      setNewPassword("");
      // Navigate to login page after success
      // replace: true avoids going back to reset page
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
      <form onSubmit={handleResetPassword} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition cursor-pointer"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
