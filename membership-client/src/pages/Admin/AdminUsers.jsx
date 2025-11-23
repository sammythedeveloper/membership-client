import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/subscription/all"); // getAllSubscriptions endpoint
        const allSubs = res.data;

        // Remove admins (if needed)
        const realSubs = allSubs.filter(
          (sub) => sub.email !== "admin@domain.com"
        );

        // Deduplicate users
        const userMap = new Map();
        realSubs.forEach((sub) => {
          if (!userMap.has(sub.user_id)) {
            userMap.set(sub.user_id, {
              id: sub.user_id,
              name: sub.name,
              email: sub.email,
              created_at: sub.created_at,
            });
          }
        });

        setUsers(Array.from(userMap.values()));
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6">Users</h2>
        <div className="bg-white shadow rounded-xl p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
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
