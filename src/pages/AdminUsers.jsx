import React, { useEffect, useState } from "react";
import { addUser, deleteUser, getUsers } from "../api/userApi";
import Navbar from "../components/Navbar";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
  });

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    const data = await getUsers(token);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const result = await addUser(form, token);
      alert(`User '${result.user.username}' added!`);
      setForm({ username: "", email: "", password: "", role: "student" });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add user");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await deleteUser(id, token);
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-blue-50 pb-10">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        <form
          onSubmit={handleAddUser}
          className="mb-6 bg-white p-4 rounded shadow-md space-y-4"
        >
          <h2 className="text-lg font-semibold">Add New User</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Username"
              className="border p-2 rounded w-full"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded w-full"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded w-full"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <select
              className="border p-2 rounded w-full"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Add User
          </button>
        </form>

        <div className="bg-white p-4 rounded shadow-md overflow-x-auto">
          <h2 className="text-lg font-semibold mb-3">All Users</h2>
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-2 px-4">Username</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="py-2 px-4">{u.username}</td>
                  <td className="py-2 px-4">{u.email}</td>
                  <td className="py-2 px-4 capitalize">{u.role}</td>
                  <td className="py-2 px-4">
                    {u.role !== "admin" && (
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <p className="text-gray-500 mt-3">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
