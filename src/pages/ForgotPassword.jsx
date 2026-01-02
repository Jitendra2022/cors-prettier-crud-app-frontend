import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../api/axiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const value = e.target.value;
    // If it starts with number, treat as phone
    if (/^\+?\d*$/.test(value)) {
      setPhone(value);
      setEmail(""); // clear email if typing phone
    } else {
      // If contains @ treat as email
      setEmail(value);
      setPhone("");
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email && !phone)
      return toast.error("Please enter a valid email or phone");
    const emailOrPassword = email ? { email } : { phone };
    try {
      const res = await axiosInstance.post(
        "/api/v1/forgot-password",
        emailOrPassword,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message || "OTP sent successfully!");
      navigate("/verify-otp", { state: { email, phone } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
      <form onSubmit={handleSendOtp} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Email or Phone</label>
          <input
            type="text"
            value={email || phone}
            onChange={handleInputChange}
            placeholder="Enter your email or phone"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition cursor-pointer"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
