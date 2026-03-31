import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FiCalendar, FiClock, FiLayers, FiArrowRight } from "react-icons/fi";

// Images (Using your existing imports)
import artImg from "../../assets/art.jpg";
import bookClubImg from "../../assets/bookclub.jpg";
import basketballImg from "../../assets/basketball.jpg";
import walkImg from "../../assets/walk.jpg";
import MembershipDetailModal from "./MembershipDetailModal";

const membershipImages = {
  "Art & Sketch Membership": artImg,
  "Book Club": bookClubImg,
  "Basketball Training": basketballImg,
  "Walking Club": walkImg,
};

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(true);
  const [selectedSub, setSelectedSub] = useState(null);
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
        setLoadingSubscriptions(false);
      }
    };
    if (user) fetchSubscriptions();
  }, [user]);

  if (!user) return null;

  const firstName = user.name.split(" ")[0]; // Clean first name

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans">
      <Navbar userName={firstName} />

      {/* Hero Welcome Section */}
      <header className="relative py-12 px-6 md:px-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[100px] -z-0" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-rose-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">
                Member Dashboard
              </p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
                Selam, <span className="text-rose-600">{firstName}</span>!
              </h2>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl backdrop-blur-md">
              <div className="text-xs text-zinc-500 font-bold uppercase mb-1">
                Active Memberships
              </div>
              <div className="text-2xl font-black text-white">
                {subscriptions.length}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow p-6 md:px-16 max-w-7xl mx-auto w-full pb-20">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FiLayers className="text-rose-600" /> My Programs
          </h3>
          <Link to="/browse-memberships">
            <button
              onClick={() => navigate("/memberships")}
              className="text-xs font-bold text-zinc-500 hover:text-white transition flex items-center gap-2"
            >
              Explore More <FiArrowRight />
            </button>
          </Link>
        </div>

        {loadingSubscriptions ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-500 font-medium tracking-widest text-xs uppercase">
              Updating Hub...
            </p>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="bg-[#0d0d0d] border border-zinc-800 border-dashed rounded-[32px] p-20 text-center">
            <p className="text-zinc-500 mb-6">
              You haven't joined any sessions yet.
            </p>
            <button
              onClick={() => navigate("/memberships")}
              className="bg-white text-black px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-rose-600 hover:text-white transition-all"
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {subscriptions.map((sub) => {
              const imgSrc = membershipImages[sub.activity?.trim()];

              return (
                <div
                  key={sub.id}
                  className="group relative bg-[#0d0d0d] border border-zinc-800/50 rounded-[32px] overflow-hidden hover:border-rose-600/50 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(225,29,72,0.15)]"
                >
                  {/* Top: Image Section */}
                  <div className="h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent z-10" />
                    {imgSrc && (
                      <img
                        src={imgSrc}
                        alt={sub.activity}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                      />
                    )}
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          sub.status === "active"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-rose-500/10 text-rose-500"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Content */}
                  <div className="p-8 space-y-6">
                    <h3 className="text-2xl font-black tracking-tight group-hover:text-rose-500 transition-colors">
                      {sub.activity}
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-zinc-500">
                          <FiClock size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            Duration
                          </span>
                        </div>
                        <p className="text-sm font-bold">
                          {sub.duration} Months
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-zinc-500">
                          <FiCalendar size={14} />
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
                      onClick={() => setSelectedSub(sub)} // Pass the whole sub object
                      className="w-full py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-rose-600 group-hover:border-rose-600 transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <MembershipDetailModal
        isOpen={!!selectedSub}
        onClose={() => setSelectedSub(null)}
        subscription={selectedSub}
      />
    </div>
  );
}
