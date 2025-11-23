// AdminSettings.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSettings() {
  const [admin, setAdmin] = useState({ name: "", email: "" });
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch admin info from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.role === "admin") {
      setAdmin({
        name: userData.name || "Admin",
        email: userData.email || "",
      });
    }
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setMessage("Profile updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setMessage("Password changed successfully!");
    setPassword("");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="flex-1 p-10">
      {/* Breadcrumb / Back Menu */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="text-rose-950 font-medium hover:underline"
        >
          &larr; Back to Dashboard
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6">Settings</h2>

      {message && (
        <p className="bg-green-100 text-green-800 p-3 rounded mb-4">{message}</p>
      )}

      {/* Profile Info */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={admin.name}
              onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-950"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={admin.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-950"
            />
          </div>

          <button
            type="submit"
            className="bg-rose-950 text-white px-6 py-2 rounded-lg hover:bg-black transition"
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-950"
            />
          </div>

          <button
            type="submit"
            className="bg-rose-950 text-white px-6 py-2 rounded-lg hover:bg-black transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
