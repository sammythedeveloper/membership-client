import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import AdminSidebar from "../../components/AdminSidebar";
import { FiTrash2, FiFilter } from "react-icons/fi";

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
          return { ...sub, status };
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
      console.error("Failed to delete:", err);
    } finally {
      setDeletingId(null);
      setConfirmModal({ show: false, subId: null });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#080808] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
            Syncing Logs
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#080808] text-white font-sans">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-12 lg:p-20 overflow-y-auto mt-16 lg:mt-0">
        <header className="mb-8 lg:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-rose-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-2 text-center md:text-left">
              Live Logs
            </p>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tighter text-center md:text-left uppercase italic">
              Subscriptions
            </h2>
          </div>
          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all">
            <FiFilter /> Filter Status
          </button>
        </header>

        {/* MOBILE VIEW: Stacking Cards (Hidden on Large) */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="bg-[#0d0d0d] border border-zinc-800 p-6 rounded-[32px] shadow-xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-rose-500 font-black">
                    {sub.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">
                      {sub.name}
                    </h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                      {sub.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setConfirmModal({ show: true, subId: sub.id })}
                  className="p-3 bg-zinc-900 text-rose-600 rounded-xl active:scale-95"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-zinc-800/50">
                <div>
                  <p className="text-[8px] font-black uppercase text-zinc-500 tracking-widest mb-1">
                    Program
                  </p>
                  <p className="text-xs font-bold text-zinc-200">
                    {sub.activity}
                  </p>
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase text-zinc-500 tracking-widest mb-1">
                    Duration
                  </p>
                  <p className="text-xs font-bold text-zinc-200">
                    {sub.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">
                    Valid Until
                  </p>
                  <span className="text-[10px] font-bold text-rose-500/80">
                    {new Date(sub.end_date).toISOString().slice(0, 10)}
                  </span>
                </div>
                {sub.status === "active" ? (
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                    Active
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-zinc-800 text-zinc-500 text-[8px] font-black uppercase tracking-widest rounded-full border border-zinc-700">
                    Expired
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW: Traditional Table (Hidden on Mobile) */}
        <div className="hidden lg:block bg-[#0d0d0d] border border-zinc-800 rounded-[40px] overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-900/50">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Subscriber
                </th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Program
                </th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Validity
                </th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Status
                </th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {subscriptions.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-zinc-900/30 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-zinc-200 tracking-tight">
                        {sub.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-medium">
                        {sub.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-zinc-300">
                    {sub.activity}
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-[10px] font-bold text-rose-500/50 tracking-widest">
                      EXP: {new Date(sub.end_date).toISOString().slice(0, 10)}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {sub.status === "active" ? (
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-emerald-500/20">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-zinc-800 text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em] rounded-full">
                        Expired
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() =>
                        setConfirmModal({ show: true, subId: sub.id })
                      }
                      className="p-3 bg-zinc-900 text-zinc-500 hover:bg-rose-600 hover:text-white rounded-xl transition-all"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal remains the same */}
        {confirmModal.show && (
          <div className="fixed inset-0 flex items-center justify-center z-[500] p-4">
            <div
              className="absolute inset-0 bg-[#080808]/90 backdrop-blur-sm"
              onClick={() => setConfirmModal({ show: false, subId: null })}
            />
            <div className="relative bg-[#0f0f0f] border border-zinc-800 rounded-[32px] p-10 w-full max-w-sm shadow-2xl text-center">
              <FiTrash2 className="mx-auto text-rose-600 mb-6" size={32} />
              <h3 className="text-xl font-black text-white mb-2 uppercase italic">
                Revoke Access?
              </h3>
              <p className="text-zinc-500 text-xs mb-8">
                This action will immediately terminate the member's access.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleDelete(confirmModal.subId)}
                  disabled={deletingId === confirmModal.subId}
                  className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-rose-900/20"
                >
                  {deletingId === confirmModal.subId
                    ? "Revoking..."
                    : "Confirm Deletion"}
                </button>
                <button
                  onClick={() => setConfirmModal({ show: false, subId: null })}
                  className="w-full py-4 bg-zinc-900 text-zinc-400 rounded-2xl font-black uppercase text-[10px] tracking-widest"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
