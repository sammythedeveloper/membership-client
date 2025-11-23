import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance"; // Make sure it includes admin auth headers
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("Admin");
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    revenue: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.name) {
      const name = userData.name.charAt(0).toUpperCase() + userData.name.slice(1);
      setAdminName(name);
    }
  
    const fetchAdminData = async () => {
      try {
        const res = await axios.get("/subscription/all"); // getAllSubscriptions endpoint
        const subscriptions = res.data;
  
        // Filter out the admin user(s)
        const realUsersSubs = subscriptions.filter(sub => sub.role !== 'admin'); // <-- you need a 'role' column or filter by id
  
        // Total users (unique)
        const uniqueUsers = Array.from(new Set(realUsersSubs.map(sub => sub.user_id)));
        const totalUsers = uniqueUsers.length;
  
        // Active subscriptions
        const today = new Date();
        const activeSubscriptions = realUsersSubs.filter(sub => new Date(sub.end_date) >= today).length;
  
        // Recent users (deduplicated by user_id)
        const recentUsersMap = new Map();
        realUsersSubs
          .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
          .forEach(sub => {
            if (!recentUsersMap.has(sub.user_id)) {
              recentUsersMap.set(sub.user_id, { id: sub.user_id, name: sub.name, email: sub.email });
            }
          });
  
        const recentUsers = Array.from(recentUsersMap.values()).slice(0, 5);
  
        setStats({ totalUsers, activeSubscriptions});
        setRecentUsers(recentUsers);
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAdminData();
  }, []);
  

  if (loading) return <div className="p-10">Loading dashboard...</div>;

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
                  <td className="py-2 text-black ">{user.name}</td>
                  <td className="py-2 text-black  ">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
