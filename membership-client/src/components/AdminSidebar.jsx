import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiRepeat,
  FiSettings,
  FiLogOut,
  FiShield,
  FiChevronRight,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!userData || userData.role !== "admin" || !token) {
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiGrid /> },
    { name: "Users", path: "/admin/users", icon: <FiUsers /> },
    { name: "Subscriptions", path: "/admin/subscriptions", icon: <FiRepeat /> },
    { name: "Settings", path: "/admin/settings", icon: <FiSettings /> },
  ];

  return (
    <>
      {/* --- MOBILE TOP BAR (Visible only on small screens) --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0d0d0d] border-b border-zinc-800 flex items-center justify-between px-6 z-[100]">
        <div className="flex items-center gap-2">
          <FiShield className="text-rose-600" size={20} />
          <span className="text-[10px] font-black uppercase tracking-widest text-white italic">
            Admin Hub
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-rose-600 p-2 bg-rose-600/10 rounded-lg"
        >
          {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* --- MOBILE DRAWER OVERLAY --- */}
      <div
        className={`lg:hidden fixed inset-0 bg-[#080808] z-[90] transition-transform duration-500 ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 px-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl font-black uppercase tracking-tighter transition-all ${
                location.pathname === item.path
                  ? "text-rose-600 scale-110"
                  : "text-zinc-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="mt-10 text-[10px] font-black uppercase tracking-[0.4em] text-rose-500 underline underline-offset-8"
          >
            Terminate Session
          </button>
        </nav>
      </div>

      {/* --- DESKTOP SIDEBAR (Hidden on mobile) --- */}
      <aside className="hidden lg:flex w-72 bg-[#0d0d0d] border-r border-zinc-800 flex-col p-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12 px-2 ">
          <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-900/20">
            <FiShield size={20} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-white uppercase italic">
              Admin <span className="text-rose-600">Hub</span>
            </h1>
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500">
              Mission Control
            </p>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between group px-4 py-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-900/20"
                    : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={
                      isActive
                        ? "text-white"
                        : "text-rose-600 group-hover:scale-110 transition-transform"
                    }
                  >
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {item.name}
                  </span>
                </div>
                {isActive && <FiChevronRight className="animate-pulse" />}
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-zinc-800">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-4 w-full px-4 py-4 text-zinc-500 hover:text-rose-500 transition-colors group"
          >
            <FiLogOut className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[500] p-4">
          <div
            className="absolute inset-0 bg-[#080808]/90 backdrop-blur-sm "
            onClick={() => setShowLogoutModal(false)}
          />
          <div className="relative bg-[#0f0f0f] border border-zinc-800 rounded-[32px] p-10 w-full max-w-sm shadow-2xl text-center">
            <div className="w-16 h-16 bg-rose-600/10 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiLogOut size={24} />
            </div>
            <h3 className="text-xl font-black text-white mb-2 tracking-tight">
              Confirm Logout
            </h3>
            <p className="text-zinc-500 text-xs mb-8 font-medium leading-relaxed">
              Are you sure you want to exit the Control Center?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSignOut}
                className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg"
              >
                Yes, Sign Out
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full py-4 bg-zinc-900 text-zinc-400 rounded-2xl font-black uppercase text-[10px] tracking-widest"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
