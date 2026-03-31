import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import AdminSidebar from "../../components/AdminSidebar";
import {
  FiSearch,
  FiMail,
  FiCalendar,
  FiUser,
  FiMoreVertical,
  FiUsers,
} from "react-icons/fi";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/subscription/all");
        const allSubs = res.data;

        // Filter out admins and deduplicate
        const userMap = new Map();
        allSubs
          .filter((sub) => sub.role !== "admin") // Filter by role if possible
          .forEach((sub) => {
            if (!userMap.has(sub.user_id)) {
              userMap.set(sub.user_id, {
                id: sub.user_id,
                name: sub.name,
                email: sub.email,
                joined: sub.start_date, // Using start_date as a proxy for activity
              });
            }
          });

        setUsers(Array.from(userMap.values()));
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#080808] text-white font-sans">
      <AdminSidebar />

      <main
        className="flex-1 p-6 md:p-12 lg:p-20 overflow-y-auto mt-6"
      >
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 mt-8">
          <div>
            <p className="text-rose-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">
              Database Management
            </p>
            <h2 className="text-4xl font-black tracking-tighter">
              Member Directory
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative group w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-rose-600 transition-colors" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full bg-[#0d0d0d] border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest placeholder:text-zinc-600 focus:outline-none focus:border-rose-600 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* User Table Card */}
        <div className="bg-[#0d0d0d] border border-zinc-800 rounded-[40px] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/30">
            <div className="flex items-center gap-3">
              <FiUsers className="text-rose-600" />
              <span className="text-xs font-black uppercase tracking-widest">
                Total Members: {filteredUsers.length}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-900/50">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Member
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Contact
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Registration
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-20 text-center text-zinc-600 animate-pulse uppercase text-[10px] font-black tracking-widest"
                    >
                      Syncing Database...
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-zinc-900/30 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 rounded-xl flex items-center justify-center text-rose-500 font-black text-sm group-hover:border-rose-600 transition-colors">
                          {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-sm text-zinc-200 tracking-tight">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
                          <FiMail className="text-rose-600/50" />
                          {user.email}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
                          <FiCalendar className="text-rose-600/50" />
                          {new Date(user.joined).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-600 hover:text-white transition-all">
                          <FiMoreVertical />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {!loading && filteredUsers.length === 0 && (
            <div className="p-20 text-center">
              <FiUser className="mx-auto text-zinc-800 mb-4" size={48} />
              <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                No members match your search
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
