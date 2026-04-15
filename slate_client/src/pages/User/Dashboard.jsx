import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Database, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import DetailModal from "./DetailModal";
import Footer from "../Footer";

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
        console.error("Failed to load state:", err);
      } finally {
        setLoadingSubscriptions(false);
      }
    };
    if (user) fetchSubscriptions();
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      <Navbar userName={user.name} />

      <main className="max-w-7xl mx-auto px-6 py-24">
        {/* Welcome Section */}
        <header className="mb-24">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
              System Operational
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
            Welcome, <span className="text-zinc-400 dark:text-zinc-600">{user.name.split(" ")[0]}</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-[10px]">
            ACTIVE LEDGER COUNT: {subscriptions.length}
          </p>
        </header>

        {/* Subscription Grid - Branded as 'Infrastructure Modules' */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-zinc-200 dark:border-zinc-900 pb-4">
            <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">
              Deployed Services
            </h3>
            <Link to="/browse-memberships" className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-50">
              Provision New <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loadingSubscriptions ? (
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">Syncing state...</div>
          ) : subscriptions.length === 0 ? (
            <div className="p-20 border border-zinc-200 dark:border-zinc-900 text-center">
              <p className="text-zinc-500 mb-8 uppercase tracking-widest text-[10px]">No active modules found.</p>
              <Link to="/browse-memberships" className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-widest hover:opacity-80">
                Initialize Gateway
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="bg-zinc-100 dark:bg-[#050505] p-10 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                  <div className="mb-6 flex justify-between items-start">
                    <Database className="w-5 h-5 text-zinc-400" />
                    <span className="text-[9px] font-bold uppercase tracking-widest bg-zinc-200 dark:bg-zinc-800 px-2 py-1">
                      {sub.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tighter mb-4">{sub.activity}</h3>
                  <div className="space-y-2 mb-8">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500">Expiry: {new Date(sub.end_date).toLocaleDateString()}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedSub(sub)}
                    className="w-full py-3 border border-zinc-300 dark:border-zinc-700 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                  >
                    View Instance
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <DetailModal
        isOpen={!!selectedSub}
        onClose={() => setSelectedSub(null)}
        subscription={selectedSub}
      />
      <Footer/>
    </div>
  );
}