import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("Admin");
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    revenue: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.name) {
      const name = userData.name.charAt(0).toUpperCase() + userData.name.slice(1);
      setAdminName(name);
    }

    // Mock data
    setStats({ totalUsers: 82, activeSubscriptions: 45, revenue: 1240 });
    setRecentUsers([
      { id: 1, name: "Alice Johnson", email: "alice@email.com" },
      { id: 2, name: "Mark Stone", email: "mark@email.com" },
      { id: 3, name: "Sarah Lee", email: "sarah@email.com" },
    ]);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6">Welcome, {adminName} 👋</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow p-6 rounded-xl">
            <p className="text-gray-500 text-sm">Total Users</p>
            <h3 className="text-3xl font-bold">{stats.totalUsers}</h3>
          </div>

          <div className="bg-white shadow p-6 rounded-xl">
            <p className="text-gray-500 text-sm">Active Subscriptions</p>
            <h3 className="text-3xl font-bold">{stats.activeSubscriptions}</h3>
          </div>

          <div className="bg-white shadow p-6 rounded-xl">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h3 className="text-3xl font-bold">${stats.revenue}</h3>
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Users</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(user => (
                <tr key={user.id} className="border-b last:border-none">
                  <td className="py-2">{user.name}</td>
                  <td className="py-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
