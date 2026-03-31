import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";

export default function Navbar({ userName }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin", { replace: true });
  };

  return (
    <>
      <nav className="relative w-full border-b border-zinc-900/30 bg-[#080808] z-50">
        <div className="flex items-center justify-between px-6 py-5 md:px-20">
          <div className="flex items-center gap-10">
            <Link
              to="/dashboard"
              className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-3 text-rose-500"
            >
              <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-sm text-zinc-950">
                ሀ
              </div>
              <span className="inline-block">MEMBERSHIP</span>
            </Link>

            {/* Dashboard Links - Same style as Landing */}
            <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-500">
              <Link to="/dashboard" className="hover:text-rose-500 transition">
                Dashboard
              </Link>
              <Link
                to="/browse-memberships"
                className="hover:text-rose-500 transition"
              >
                Browse
              </Link>
              <Link
                to="/cancel-subscription"
                className="hover:text-rose-500 transition"
              >
                Manage
              </Link>
              <Link to="/About" className="hover:text-rose-500 transition">
                About
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="px-6 py-2.5 text-sm font-bold bg-zinc-900 border border-zinc-800 text-white rounded-full hover:bg-rose-600 hover:border-rose-600 transition shadow-lg"
            >
              Sign Out
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Same animation and style as Landing */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0d0d0d] border-b border-zinc-800 p-6 flex flex-col gap-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-4 text-zinc-400 font-medium">
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
              <Link to="/browse-memberships" onClick={() => setIsOpen(false)}>
                Browse
              </Link>
              <Link to="/cancel-subscription" onClick={() => setIsOpen(false)}>
                Manage
              </Link>
              <Link to="/About" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </div>
            <hr className="border-zinc-800" />
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowLogoutModal(true);
                }}
                className="px-6 py-3 text-center text-sm font-bold bg-rose-600 text-white rounded-xl"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Dark Modal - Stays consistent with the Auth pages */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowLogoutModal(false)}
          />
          <div className="relative bg-[#0d0d0d] border border-zinc-800 rounded-[32px] p-8 md:p-12 w-full max-w-md shadow-2xl text-center">
            <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
              <FiLogOut />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Leaving already?
            </h3>
            <p className="text-zinc-500 text-sm mb-8 font-medium">
              You'll need to sign back in to access your basketball sessions.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSignOut}
                className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold text-sm transition-all"
              >
                Yes, Sign Out
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full py-4 bg-zinc-900 text-zinc-400 hover:text-white rounded-2xl font-bold text-sm transition-all"
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
