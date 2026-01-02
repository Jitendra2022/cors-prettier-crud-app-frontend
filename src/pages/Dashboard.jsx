import { useContext, useState } from "react";

import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { axiosInstance } from "../api/axiosInstance";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { auth, loading } = useContext(AuthContext);
  const getUserList = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/users", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setUsers(res.data.users);
      toast.success("User list fetched successfully!");
    } catch (err) {
      console.error(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };
  useState(() => {
    getUserList();
  }, []);
  return (
    <>
      <h1 className="text-3xl text-center font-bold">
        Dashboard List All Employee
      </h1>
    </>
  );
};

export default Dashboard;
