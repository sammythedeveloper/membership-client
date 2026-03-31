import { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FiCheck, FiStar, FiZap, FiShield, FiUsers } from "react-icons/fi";

const availablePlans = [
  {
    activity: "Free trial",
    displayName: "Guest Pass",
    duration: "1",
    price: "$0",
    description:
      "Perfect for newcomers. Access community announcements and public cultural events.",
    features: [
      "Access to Public Forums",
      "Event Notifications",
      "Basic Resource Library",
    ],
    tier: "GUEST",
    color: "zinc",
  },
  {
    activity: "Beginner players plan",
    displayName: "Community Member",
    duration: "1",
    price: "$15",
    description:
      "Our core membership. Join regular sports runs, coffee meets, and skill workshops.",
    features: [
      "Weekly Open Runs",
      "Cultural Workshops",
      "Member-only Discounts",
    ],
    tier: "BASIC",
    color: "rose",
  },
  {
    activity: "Pro Players Plan",
    displayName: "Gold Membership",
    duration: "1",
    price: "$25",
    description:
      "For those dedicated to growth and leadership within the GTA Diaspora.",
    features: [
      "Priority Event Access",
      "Mentorship Programs",
      "Leadership Training",
    ],
    tier: "PRO",
    color: "rose",
  },
  {
    activity: "Challenge Plan",
    displayName: "Impact Pass",
    duration: "1",
    price: "$50",
    description:
      "Support the hub's growth. Includes all perks plus direct contribution to youth programs.",
    features: ["All Pro Perks", "Sponsor Recognition", "Direct Youth Support"],
    tier: "IMPACT",
    color: "white",
  },
];

const communityMentors = [
  {
    name: "Dawit Tekle",
    avatar: "/1.png",
    role: "Sports & Wellness Lead",
    bio: "Dedicated to building community through physical activity and health education.",
  },
  {
    name: "Sara Selassie",
    avatar: "/3.png",
    role: "Youth Programs Director",
    bio: "Specializes in developing leadership skills for the next generation in Toronto.",
  },
  {
    name: "Yonas Gebre",
    avatar: "/2.png",
    role: "Community Engagement",
    bio: "Focused on networking and professional growth within the Diaspora.",
  },
  {
    name: "Eden Haile",
    avatar: "/4.png",
    role: "Cultural Coordinator",
    bio: "Bringing the beauty of Ethiopian heritage to our local GTA events.",
  },
];

export default function BrowseMembership() {
  const [user, setUser] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) navigate("/signin");
    else setUser(userData);
  }, [navigate]);

  const handleSubscribe = async (plan) => {
    setLoadingPlan(plan.activity);
    setMessage("");
    try {
      const res = await axios.post("/subscription/checkout", {
        activity: plan.activity,
        duration: plan.duration,
      });
      window.location.href = res.data.url;
    } catch (err) {
      setMessage("System busy. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans">
      <Navbar userName={user.name.split(" ")[0]} />

      <main className="max-w-7xl mx-auto w-full px-6 py-16 md:py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            Choose Your <span className="text-rose-600">Journey</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
            Join the premier hub for the Ethiopian Diaspora in the GTA. Connect,
            grow, and lead with your community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {availablePlans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-[#0d0d0d] border ${
                plan.tier === "PRO"
                  ? "border-rose-600/50"
                  : "border-zinc-800/50"
              } rounded-[32px] p-8 flex flex-col hover:border-rose-600 transition-all duration-500 group`}
            >

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 group-hover:text-rose-500 transition-colors">
                  {plan.displayName}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                    / Month
                  </span>
                </div>
              </div>

              <p className="text-zinc-400 text-xs leading-relaxed mb-8 font-medium">
                {plan.description}
              </p>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-rose-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiCheck size={12} className="text-rose-600" />
                    </div>
                    <span className="text-xs font-bold text-zinc-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscribe(plan)}
                disabled={loadingPlan === plan.activity}
                className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all active:scale-[0.98] ${
                  plan.color === "rose"
                    ? "bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-900/20"
                    : "bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800"
                }`}
              >
                {loadingPlan === plan.activity ? "Verifying..." : "Select Plan"}
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Community Mentors Section */}
      <section className="bg-[#0b0b0b] border-y border-zinc-900 py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight">
                Community <span className="text-rose-600">Mentors</span>
              </h2>
              <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">
                Guided by Experience • Powered by Culture
              </p>
            </div>
            <div className="flex items-center gap-4 bg-zinc-900/50 p-3 rounded-2xl border border-zinc-800">
              <FiUsers className="text-rose-600" />
              <span className="text-xs font-black uppercase tracking-widest">
                50+ Active Members
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityMentors.map((mentor, idx) => (
              <div key={idx} className="group text-center">
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 bg-rose-600 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-32 h-32 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-zinc-800 group-hover:border-rose-600 relative z-10"
                  />
                </div>
                <h3 className="text-lg font-bold mb-1">{mentor.name}</h3>
                <p className="text-rose-600 text-[10px] font-black uppercase tracking-widest mb-3">
                  {mentor.role}
                </p>
                <p className="text-zinc-500 text-xs leading-relaxed font-medium px-4">
                  {mentor.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
