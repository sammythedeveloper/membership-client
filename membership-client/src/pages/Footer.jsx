import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#050505] text-zinc-400 pt-20 pb-10 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-2 text-white font-black tracking-tighter text-xl">
              <Link
                to="/"
                className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-3 text-rose-500"
              >
                <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-white text-sm">
                  ሀ
                </div>
                <span className="inline-block">MEMBERSHIP</span>
              </Link>
            </div>
            <p className="text-sm leading-relaxed">
              Strengthening the Ethiopian community in the GTA through
              basketball, wellness, and collective growth.
            </p>
            <div className="flex gap-4">
              {/* Simple Social Icons Placeholder */}
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-rose-500 transition cursor-pointer">
                <span className="text-xs">IG</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-rose-500 transition cursor-pointer">
                <span className="text-xs">TW</span>
              </div>
            </div>
          </div>

          {/* Links: Platform */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              Platform
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/programs" className="hover:text-rose-500 transition">
                  Training Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="hover:text-rose-500 transition"
                >
                  Community Runs
                </Link>
              </li>
              <li>
                <Link to="/wellness" className="hover:text-rose-500 transition">
                  Wellness Hub
                </Link>
              </li>
              <li>
                <Link
                  to="/membership"
                  className="hover:text-rose-500 transition"
                >
                  Plans & Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Community */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              Community
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/about" className="hover:text-rose-500 transition">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-rose-500 transition">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link to="/mentors" className="hover:text-rose-500 transition">
                  Meet the Coaches
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-rose-500 transition">
                  Common Questions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500">
            &copy; 2025 Membership Portal. Built for the GTA.
          </p>
          <div className="flex gap-8 text-xs font-medium">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
