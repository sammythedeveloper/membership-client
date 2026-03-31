import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import AdminSidebar from "../../components/AdminSidebar";
import {
  FiUsers,
  FiActivity,
  FiTrendingUp,
  FiUserPlus,
  FiArrowUpRight,
} from "react-icons/fi";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("Admin");
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.name) {
      const name = userData.name.split(" ")[0]; // Get first name
      setAdminName(name);
    }

    const fetchAdminData = async () => {
      try {
        const res = await axios.get("/subscription/all");
        const subscriptions = res.data;

        const realUsersSubs = subscriptions.filter(
          (sub) => sub.role !== "admin"
        );

        const uniqueUsers = Array.from(
          new Set(realUsersSubs.map((sub) => sub.user_id))
        );
        const totalUsers = uniqueUsers.length;

        const today = new Date();
        const activeSubscriptions = realUsersSubs.filter(
          (sub) => new Date(sub.end_date) >= today
        ).length;

        const recentUsersMap = new Map();
        realUsersSubs
          .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
          .forEach((sub) => {
            if (!recentUsersMap.has(sub.user_id)) {
              recentUsersMap.set(sub.user_id, {
                id: sub.user_id,
                name: sub.name,
                email: sub.email,
              });
            }
          });

        const recentUsersList = Array.from(recentUsersMap.values()).slice(0, 5);

        setStats({ totalUsers, activeSubscriptions });
        setRecentUsers(recentUsersList);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#080808] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
            Initializing Control Center
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#080808] text-white font-sans">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-12 lg:p-20 overflow-y-auto">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-rose-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">
              Systems Overview
            </p>
            <h2 className="text-4xl font-black tracking-tighter">
              Welcome back, {adminName}
            </h2>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              System Live • 2025
            </span>
          </div>
        </header>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#0d0d0d] border border-zinc-800 p-8 rounded-[32px] group hover:border-rose-600/50 transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-rose-600/10 rounded-2xl">
                <FiUsers className="text-rose-600" size={24} />
              </div>
              <FiTrendingUp className="text-emerald-500" />
            </div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              Total Members
            </p>
            <h3 className="text-4xl font-black tracking-tighter">
              {stats.totalUsers}
            </h3>
          </div>

          <div className="bg-[#0d0d0d] border border-zinc-800 p-8 rounded-[32px] group hover:border-rose-600/50 transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-rose-600/10 rounded-2xl">
                <FiActivity className="text-rose-600" size={24} />
              </div>
              <span className="text-[10px] font-bold text-emerald-500">
                +12%
              </span>
            </div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              Active Passes
            </p>
            <h3 className="text-4xl font-black tracking-tighter">
              {stats.activeSubscriptions}
            </h3>
          </div>

          <div className="hidden lg:block bg-[#0d0d0d] border border-zinc-800 p-8 rounded-[32px] group hover:border-rose-600/50 transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-rose-600/10 rounded-2xl">
                <FiUserPlus className="text-rose-600" size={24} />
              </div>
              <FiArrowUpRight className="text-zinc-600" />
            </div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              New Registrations
            </p>
            <h3 className="text-4xl font-black tracking-tighter">
              {recentUsers.length}
            </h3>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-[#0d0d0d] border border-zinc-800 rounded-[40px] overflow-hidden shadow-2xl">
          <div className="p-10 border-b border-zinc-800 flex justify-between items-center">
            <h3 className="text-xl font-black tracking-tight italic uppercase">
              Recent Member Activity
            </h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition">
              View All Members
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-900/50">
                  <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Member Name
                  </th>
                  <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Email Address
                  </th>
                  <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Status
                  </th>
                  <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {recentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-zinc-900/30 transition-colors group"
                  >
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-rose-500">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-bold text-sm text-zinc-200">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-sm text-zinc-500 font-medium">
                      {user.email}
                    </td>
                    <td className="px-10 py-6">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                        Active
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <button className="text-[10px] font-black uppercase tracking-widest text-rose-600 hover:text-rose-500 transition">
                        Review Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
