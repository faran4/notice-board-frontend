import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { deleteNotice, getNotices, postNotice } from "../api/noticeApi";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: "", content: "" });

  const fetchNotices = async () => {
    const data = await getNotices();
    setNotices(data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await postNotice(newNotice, token);
    await fetchNotices();
    setNewNotice({ title: "", content: "" });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await deleteNotice(id, token);
    setNotices(notices.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-blue-50 pb-10">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Welcome, {user.username}
        </h1>

        {/* Post Form */}
        {(user.role === "teacher" || user.role === "admin") && (
          <form
            onSubmit={handlePost}
            className="mb-8 bg-white p-6 rounded-2xl shadow-lg space-y-4"
          >
            <h2 className="text-lg font-semibold">Post a Notice</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={newNotice.title}
              onChange={(e) =>
                setNewNotice({ ...newNotice, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Content"
              className="w-full p-2 border rounded h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={newNotice.content}
              onChange={(e) =>
                setNewNotice({ ...newNotice, content: e.target.value })
              }
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Post
            </button>
          </form>
        )}

        {/* Notices List */}
        <div className="flex flex-col gap-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition w-full mx-auto"
            >
              {/* Top Row: Title + Delete */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <div className="flex flex-col flex-wrap">
                  <h3 className="text-lg font-bold text-blue-700">
                    {notice.title}
                  </h3>
                  <p className="text-gray-700 mt-1">
                    {notice.content}
                  </p>
                </div>

                {(user.role === "admin" ||
                  user.username === notice.posted_by) && (
                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="text-red-600 text-sm hover:underline mt-2 sm:mt-0 sm:ml-4"
                  >
                    Delete
                  </button>
                )}
              </div>

              {/* Footer: Posted by + Date */}
              <div className="text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-1">
                <span className="break-words">
                  Posted by: {notice.posted_by}
                </span>
                <span className="break-words">
                  {new Date(notice.created_at).toLocaleDateString("en-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
