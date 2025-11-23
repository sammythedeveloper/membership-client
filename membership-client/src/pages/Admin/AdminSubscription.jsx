import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    subId: null,
  });

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await axios.get("/subscription/all");
        const subs = res.data.map((sub) => {
          const today = new Date();
          const endDate = new Date(sub.end_date);
          const status = endDate >= today ? "active" : "expired";
          return {
            id: sub.id,
            name: sub.name,
            email: sub.email,
            activity: sub.activity,
            duration: sub.duration,
            start_date: sub.start_date,
            end_date: sub.end_date,
            status,
          };
        });
        setSubscriptions(subs);
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`/subscription/delete/${id}`);
      setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    } catch (err) {
      console.error("Failed to delete subscription:", err);
      alert("Failed to delete subscription. Try again.");
    } finally {
      setDeletingId(null);
      setConfirmModal({ show: false, subId: null });
    }
  };

  if (loading) return <div className="p-10">Loading subscriptions...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6">All Subscriptions</h2>
        <div className="bg-white shadow rounded-xl p-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Subscription</th>
                <th className="py-2">Duration</th>
                <th className="py-2">Start Date</th>
                <th className="py-2">End Date</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="border-b last:border-none">
                  <td className="py-2">{sub.name}</td>
                  <td className="py-2">{sub.email}</td>
                  <td className="py-2">{sub.activity}</td>
                  <td className="py-2">{sub.duration}</td>
                  <td className="py-2">
                    {new Date(sub.start_date).toISOString().slice(0, 10)}
                  </td>
                  <td className="py-2">
                    {new Date(sub.end_date).toISOString().slice(0, 10)}
                  </td>
                  <td className="py-2 font-light  text-green-600 ">
                    {sub.status}
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() =>
                        setConfirmModal({ show: true, subId: sub.id })
                      }
                      className="bg-red-600 hover:bg-red-800 text-white py-1 px-3 rounded-md font-light"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Confirmation Modal */}
        {confirmModal.show && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl p-6 w-96">
              <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
              <p className="mb-6">
                Are you sure you want to delete this subscription? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setConfirmModal({ show: false, subId: null })}
                  className="py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100"
                >
                  No
                </button>
                <button
                  onClick={() => handleDelete(confirmModal.subId)}
                  disabled={deletingId === confirmModal.subId}
                  className="py-2 px-4 rounded-md bg-red-600 text-white hover:bg-red-800"
                >
                  {deletingId === confirmModal.subId
                    ? "Deleting..."
                    : "Yes, Sure"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
