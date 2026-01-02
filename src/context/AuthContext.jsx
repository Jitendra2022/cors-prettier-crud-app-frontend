import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("api/v1/refresh", {
          withCredentials: true,
        });
        setAuth({
          accessToken: res.data.accessToken,
          role: res.data.user.role,
          name: res.data.user.name,
        });
      } catch (err) {
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
