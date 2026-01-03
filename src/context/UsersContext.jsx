import { createContext, useEffect, useState, useContext } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { AuthContext } from "./AuthContext";

const UsersContext = createContext(null);
const UsersProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    // If no token, skip fetching
    if (!auth?.accessToken) {
      setUsers([]);
      setLoadingUsers(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/users", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        setUsers(res.data.users || []);
      } catch (err) {
        console.error(err);
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
    // refetch when token changes
  }, [auth?.accessToken]);
  return (
    <UsersContext.Provider value={{ users, setUsers, loadingUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContext, UsersProvider };
