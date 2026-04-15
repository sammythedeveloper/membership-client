import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  FiAlertTriangle,
  FiXCircle,
  FiCalendar,
  FiClock,
} from "react-icons/fi";

import artImg from "../../assets/art.jpg";
import bookClubImg from "../../assets/bookclub.jpg";
import basketballImg from "../../assets/basketball.jpg";
import walkImg from "../../assets/walk.jpg";

const membershipImages = {
  "Art & Sketch Membership": artImg,
  "Book Club": bookClubImg,
  "Basketball Training": basketballImg,
  "Walking Club": walkImg,
};

export default function CancelSubscription() {
  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    subId: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) navigate("/signin");
    else setUser(userData);
  }, [navigate]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await axios.get("/subscription");
        setSubscriptions(res.data.subscriptions);
      } catch (err) {
        console.error("Failed to load subscriptions:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchSubscriptions();
  }, [user]);

  const handleCancel = async () => {
    const id = confirmModal.subId;
    try {
      const res = await axios.delete(`/subscription/${id}`);
      setMessage(res.data.message);
      setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to cancel.");
    } finally {
      setConfirmModal({ show: false, subId: null });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans">
      <Navbar userName={user.name.split(" ")[0]} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-16 md:py-24">
        <header className="mb-16 text-center">
          <p className="text-rose-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-3">
            Subscription Management
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            Manage Your <span className="text-rose-600">Access</span>
          </h2>
          <p className="text-zinc-500 font-medium max-w-md mx-auto text-sm">
            Review your active community plans or end a subscription below.
          </p>
        </header>

        {message && (
          <div className="mb-10 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-500 text-xs font-bold text-center max-w-md mx-auto animate-pulse">
            {message}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
              Retrieving Records...
            </p>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="bg-[#0d0d0d] border border-zinc-800 border-dashed rounded-[40px] p-20 text-center">
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
              No active subscriptions found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subscriptions.map((sub) => {
              const imgSrc = membershipImages[sub.activity?.trim()];
              return (
                <div
                  key={sub.id}
                  className="bg-[#0d0d0d] border border-zinc-800/50 rounded-[32px] overflow-hidden hover:border-zinc-700 transition-all group"
                >
                  <div className="h-40 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent z-10" />
                    {imgSrc && (
                      <img
                        src={imgSrc}
                        alt={sub.activity}
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                      />
                    )}
                    <div className="absolute bottom-4 left-6 z-20">
                      <h3 className="text-xl font-bold tracking-tight">
                        {sub.activity}
                      </h3>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-zinc-500">
                          <FiClock size={12} />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            Plan
                          </span>
                        </div>
                        <p className="text-sm font-bold">{sub.duration} Days</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-zinc-500">
                          <FiCalendar size={12} />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            Expires
                          </span>
                        </div>
                        <p className="text-sm font-bold">
                          {new Date(sub.end_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setConfirmModal({ show: true, subId: sub.id })
                      }
                      className="w-full py-4 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-rose-600/10 hover:text-rose-500 hover:border-rose-600/20 transition-all flex items-center justify-center gap-2"
                    >
                      <FiXCircle /> Terminate Access
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Confirmation Modal - Matching the SignOut Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 flex items-center justify-center z-[200] p-4">
          <div
            className="absolute inset-0 bg-[#080808]/90 backdrop-blur-sm"
            onClick={() => setConfirmModal({ show: false, subId: null })}
          />
          <div className="relative bg-[#0f0f0f] border border-zinc-800 rounded-[32px] p-8 md:p-12 w-full max-w-md shadow-2xl text-center">
            <div className="w-20 h-20 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl animate-pulse">
              <FiAlertTriangle />
            </div>
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
              Are you sure?
            </h3>
            <p className="text-zinc-500 text-sm mb-8 font-medium leading-relaxed">
              Terminating your subscription will remove your access to the
              community sessions immediately.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCancel}
                className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all"
              >
                Yes, Cancel Subscription
              </button>
              <button
                onClick={() => setConfirmModal({ show: false, subId: null })}
                className="w-full py-4 bg-zinc-900 text-zinc-400 hover:text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all"
              >
                Keep My Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
