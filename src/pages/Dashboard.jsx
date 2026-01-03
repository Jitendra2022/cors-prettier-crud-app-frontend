import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { UsersContext } from "../context/UsersContext";
import { axiosInstance } from "../api/axiosInstance";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { auth, loading } = useContext(AuthContext);
  const { users, setUsers, loadingUsers } = useContext(UsersContext);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "" });

  // Start editing
  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setEditData({ name: user.name, email: user.email, phone: user.phone });
  };

  // Save update
  const handleUpdate = async (id) => {
    try {
      const res = await axiosInstance.put(`/api/v1/users/${id}`, editData, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      setUsers(users.map((u) => (u._id === id ? res.data.user : u)));
      setEditingUserId(null);
      toast.success("User updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      setUsers(users.filter((u) => u._id !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user");
    }
  };

  if (loading || loadingUsers) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Dashboard - All Employees
      </h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 shadow rounded-lg">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  {/* Name */}
                  <td className="px-6 py-4">
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      user.name
                    )}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4">
                    {editingUserId === user._id ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      user.email
                    )}
                  </td>

                  {/* Phone */}
                  <td className="px-6 py-4">
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        value={editData.phone}
                        onChange={(e) =>
                          setEditData({ ...editData, phone: e.target.value })
                        }
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      user.phone
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center space-x-2">
                    {editingUserId === user._id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(user._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingUserId(null)}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
