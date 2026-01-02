import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../api/axiosInstance";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // extract email and phone
  const { email, phone } = location.state || {};
  const [otp, setOtp] = useState("");
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if ((!email && !phone) || !otp) {
      return toast.error("Please enter OTP");
    }
    // Build body dynamically depending on what exists
    const emailOrPassword = email ? { email, otp } : { phone, otp };
    try {
      const res = await axiosInstance.post(
        "/api/v1/verify-otp",
        emailOrPassword,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message || "OTP verified successfully!");
      // Navigate to reset password with the same email/phone
      navigate("/reset-password", { state: { email, phone } });
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition cursor-pointer"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
