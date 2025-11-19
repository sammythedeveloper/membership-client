import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();

  // Mock data for now
  useEffect(() => {
    setSubscriptions([
      { id: 1, user: "Alice Johnson", plan: "Basic", startDate: "2025-11-01", endDate: "2025-12-01", status: "active" },
      { id: 2, user: "Mark Stone", plan: "Premium", startDate: "2025-10-15", endDate: "2025-11-15", status: "expired" },
      { id: 3, user: "Sarah Lee", plan: "Pro", startDate: "2025-11-10", endDate: "2025-12-10", status: "active" },
    ]);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
     <AdminSidebar />
      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6">Subscriptions</h2>
        <div className="bg-white shadow rounded-xl p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">User</th>
                <th className="py-2">Plan</th>
                <th className="py-2">Start Date</th>
                <th className="py-2">End Date</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map(sub => (
                <tr key={sub.id} className="border-b last:border-none">
                  <td className="py-2">{sub.user}</td>
                  <td className="py-2">{sub.plan}</td>
                  <td className="py-2">{sub.startDate}</td>
                  <td className="py-2">{sub.endDate}</td>
                  <td className="py-2">{sub.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
