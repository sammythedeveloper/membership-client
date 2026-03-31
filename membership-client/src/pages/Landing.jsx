import { Link } from "react-router-dom";
import { useState } from "react";

export default function Landing() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080808] font-sans text-white overflow-hidden flex flex-col">
      {/* Responsive Navigation */}
      <nav className="relative w-full border-b border-zinc-900/30 bg-[#080808] z-50">
        <div className="flex items-center justify-between px-6 py-5 md:px-20">
          <div className="flex items-center gap-10">
            <Link
              to="/"
              className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-3 text-rose-500"
            >
              <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-white text-sm">
                ሀ
              </div>
              <span className="inline-block">MEMBERSHIP</span>
            </Link>

            <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-500">
              <a href="#community" className="hover:text-rose-500 transition">
                Community
              </a>
              <a href="#wellness" className="hover:text-rose-500 transition">
                Wellness
              </a>
              <a href="#runs" className="hover:text-rose-500 transition">
                Open Runs
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/signin"
              className="text-sm font-semibold text-zinc-400 hover:text-white"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 text-sm font-bold bg-rose-600 text-white rounded-full hover:bg-rose-700 transition shadow-lg shadow-rose-900/40"
            >
              Join the Community
            </Link>
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

        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0d0d0d] border-b border-zinc-800 p-6 flex flex-col gap-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-4 text-zinc-400 font-medium">
              <a href="#community" onClick={() => setIsOpen(false)}>
                Community
              </a>
              <a href="#wellness" onClick={() => setIsOpen(false)}>
                Wellness
              </a>
              <a href="#runs" onClick={() => setIsOpen(false)}>
                Open Runs
              </a>
            </div>
            <hr className="border-zinc-800" />
            <div className="flex flex-col gap-4">
              <Link
                to="/signin"
                className="text-center font-semibold text-zinc-400"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 text-center text-sm font-bold bg-rose-600 text-white rounded-xl"
              >
                Join the Community
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-20 pt-12 lg:pt-28 flex flex-col lg:flex-row gap-16 relative flex-grow">
        <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-rose-950/20 rounded-full blur-[140px] -z-10" />

        {/* Left Content */}
        <div className="flex-1 space-y-10 z-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] font-bold uppercase tracking-widest text-rose-500">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            Ethiopian Canadian Community
          </div>

          <h1 className="text-5xl md:text-[84px] font-black tracking-tighter leading-[0.85]">
            STRONG <br />
            <span className="text-zinc-800 text-opacity-50">AS ONE</span> <br />
            <span className="text-rose-600">COMMUNITY.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-md leading-relaxed font-medium">
            The premier platform for the{" "}
            <span className="text-white">Toronto Ethiopian Community</span> to
            unite through basketball. Elevate your health and grow together.
          </p>

          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl p-2 max-w-md shadow-2xl focus-within:ring-2 ring-rose-600/20 transition">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-transparent flex-1 px-4 outline-none text-sm text-white placeholder:text-zinc-600"
            />
            <Link to="/signup">
              <button className="bg-white text-black px-6 md:px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-tighter hover:bg-rose-600 hover:text-white transition-all duration-300">
                Get Started
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
            <span>Toronto</span>
            <span className="w-1 h-1 bg-zinc-800 rounded-full" />
            <span>Scarborough</span>
            <span className="w-1 h-1 bg-zinc-800 rounded-full" />
            <span>North York</span>
          </div>
        </div>

        {/* Right Content: Interactive Card Section */}
        <div className="flex-1 relative mt-12 md:mt-0">
          {/* Main Community Stats Card */}
          <div className="relative z-10 w-full max-w-[340px] md:max-w-sm mx-auto md:ml-auto md:mr-0 bg-[#0f0f0f] border border-zinc-800/50 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] rounded-[32px] md:rounded-[40px] p-6 md:p-10 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="flex justify-between items-start mb-10 md:mb-16 relative">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">
                  Next Session
                </p>
                <h3 className="text-base md:text-lg font-bold text-white leading-tight">
                  Sunday Community Run
                </h3>
              </div>
              <div className="bg-zinc-800 p-2 rounded-lg shrink-0">
                <svg
                  className="w-5 h-5 text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8 relative">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl md:text-3xl font-black text-white">
                    42
                  </p>
                  <p className="text-[9px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                    Members Attending
                  </p>
                </div>
                <div className="flex -space-x-2 md:-space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-[#0f0f0f] bg-zinc-800"
                    />
                  ))}
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-[#0f0f0f] bg-rose-600 flex items-center justify-center text-[9px] md:text-[10px] font-bold">
                    +39
                  </div>
                </div>
              </div>

              <button className="w-full bg-rose-600 text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-[0.15em] hover:bg-white hover:text-black transition-colors shadow-lg shadow-rose-900/20 active:scale-[0.98]">
                Confirm Attendance
              </button>
            </div>
          </div>

          {/* Floating Wellness Card - Desktop Only */}
          <div className="hidden lg:block absolute -top-12 -left-20 bg-white p-6 rounded-[28px] shadow-2xl z-20 w-60 rotate-[-4deg] transition hover:rotate-0 duration-500 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              </div>
              <span className="text-[11px] font-black text-zinc-900 uppercase tracking-widest">
                Wellness Tip
              </span>
            </div>
            <p className="text-sm font-bold text-zinc-800 leading-tight">
              Hydration is key for the 6AM runs. Drink 500ml before tip-off.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
