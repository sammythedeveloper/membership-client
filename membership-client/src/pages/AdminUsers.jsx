import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Mock data for now
  useEffect(() => {
    setUsers([
      { id: 1, name: "Alice Johnson", email: "alice@email.com", role: "user", status: "active" },
      { id: 2, name: "Mark Stone", email: "mark@email.com", role: "user", status: "inactive" },
      { id: 3, name: "Sarah Lee", email: "sarah@email.com", role: "user", status: "active" },
    ]);
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
                <th className="py-2">Role</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b last:border-none">
                  <td className="py-2">{user.name}</td>
                  <td className="py-2">{user.email}</td>
                  <td className="py-2">{user.role}</td>
                  <td className="py-2">{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
