import {
  FiX,
  FiCalendar,
  FiClock,
  FiInfo,
  FiCheckCircle,
  FiMapPin,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function MembershipDetailModal({
  isOpen,
  onClose,
  subscription,
}) {
  const navigate = useNavigate();
  if (!isOpen || !subscription) return null;

  const startDate = new Date(subscription.start_date).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
  const endDate = new Date(subscription.end_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#0d0d0d] border border-zinc-800 w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-30 p-3 bg-black/50 hover:bg-rose-600 text-white rounded-full transition-colors"
        >
          <FiX size={20} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left Side: Visual Pass */}
          <div className="md:w-1/3 bg-zinc-900 p-8 flex flex-col justify-between border-r border-zinc-800">
            <div>
              <div className="w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center text-white font-black text-xl mb-6">
                ሀ
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-1">
                Access Tier
              </h4>
              <p className="text-xl font-black text-white uppercase tracking-tighter">
                {subscription.activity.split(" ")[0]}
              </p>
            </div>

            <div className="mt-12 space-y-4">
              <div className="py-3 border-t border-zinc-800">
                <p className="text-[10px] text-zinc-500 font-bold uppercase">
                  Status
                </p>
                <p className="text-emerald-500 font-black text-sm uppercase tracking-widest italic">
                  ● {subscription.status}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Details & Features */}
          <div className="md:w-2/3 p-8 md:p-12">
            <header className="mb-8">
              <h2 className="text-3xl font-black tracking-tight text-white mb-2 italic">
                {subscription.activity}
              </h2>
              <div className="flex items-center gap-2 text-zinc-400 text-xs">
                <FiMapPin className="text-rose-600" />
                <span>GTA Community Hub • Toronto, ON</span>
              </div>
            </header>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">
                  Valid From
                </p>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <FiCalendar className="text-rose-600" /> {startDate}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">
                  Valid Until
                </p>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <FiClock className="text-rose-600" /> {endDate}
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 rounded-3xl p-6 border border-zinc-800">
              <h4 className="text-xs font-black uppercase tracking-widest text-zinc-300 mb-4 flex items-center gap-2">
                <FiInfo className="text-rose-600" /> Membership Perks
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
                  <FiCheckCircle className="text-rose-600" /> Full access to
                  community open runs
                </li>
                <li className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
                  <FiCheckCircle className="text-rose-600" /> Member-only
                  cultural event invites
                </li>
                <li className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
                  <FiCheckCircle className="text-rose-600" /> Priority
                  registration for workshops
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigate("/browse-memberships")}
              className="mt-8 w-full py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-xl"
            >
              Upgrade Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
