// import { useState, useEffect } from "react";
// import axios from "../../utils/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import { FiCheck, FiUsers } from "react-icons/fi";

// const availablePlans = [
//   {
//     activity: "Free trial",
//     displayName: "Guest Pass",
//     duration: "1",
//     price: "$0",
//     description:
//       "Perfect for newcomers. Access community announcements and public cultural events.",
//     features: [
//       "Access to Public Forums",
//       "Event Notifications",
//       "Basic Resource Library",
//     ],
//     tier: "GUEST",
//     color: "zinc",
//   },
//   {
//     activity: "Beginner players plan",
//     displayName: "Community Member",
//     duration: "1",
//     price: "$15",
//     description:
//       "Our core membership. Join regular sports runs, coffee meets, and skill workshops.",
//     features: [
//       "Weekly Open Runs",
//       "Cultural Workshops",
//       "Member-only Discounts",
//     ],
//     tier: "BASIC",
//     color: "rose",
//   },
//   {
//     activity: "Pro Players Plan",
//     displayName: "Gold Membership",
//     duration: "1",
//     price: "$25",
//     description:
//       "For those dedicated to growth and leadership within the GTA Diaspora.",
//     features: [
//       "Priority Event Access",
//       "Mentorship Programs",
//       "Leadership Training",
//     ],
//     tier: "PRO",
//     color: "rose",
//   },
//   {
//     activity: "Challenge Plan",
//     displayName: "Impact Pass",
//     duration: "1",
//     price: "$50",
//     description:
//       "Support the hub's growth. Includes all perks plus direct contribution to youth programs.",
//     features: ["All Pro Perks", "Sponsor Recognition", "Direct Youth Support"],
//     tier: "IMPACT",
//     color: "white",
//   },
// ];


// export default function BrowseMembership() {
//   const [user, setUser] = useState(null);
//   const [loadingPlan, setLoadingPlan] = useState(null);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("user"));
//     if (!userData) navigate("/signin");
//     else setUser(userData);
//   }, [navigate]);

//   const handleSubscribe = async (plan) => {
//     setLoadingPlan(plan.activity);
//     setMessage("");
//     try {
//       const res = await axios.post("/subscription/checkout", {
//         activity: plan.activity,
//         duration: plan.duration,
//       });
//       window.location.href = res.data.url;
//     } catch (err) {
//       setMessage("System busy. Please try again.");
//     } finally {
//       setLoadingPlan(null);
//     }
//   };

//   if (!user) return null;

//   return (
//     <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans">
//       <Navbar userName={user.name.split(" ")[0]} />

//       <main className="max-w-7xl mx-auto w-full px-6 py-16 md:py-24">
//         <div className="text-center mb-16 space-y-4">
//           <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
//             Choose Your <span className="text-rose-600">Journey</span>
//           </h2>
//           <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
//             Join the premier hub for the Ethiopian Diaspora in the GTA. Connect,
//             grow, and lead with your community.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {availablePlans.map((plan, idx) => (
//             <div
//               key={idx}
//               className={`relative bg-[#0d0d0d] border ${
//                 plan.tier === "PRO"
//                   ? "border-rose-600/50"
//                   : "border-zinc-800/50"
//               } rounded-[32px] p-8 flex flex-col hover:border-rose-600 transition-all duration-500 group`}
//             >

//               <div className="mb-8">
//                 <h3 className="text-xl font-bold mb-2 group-hover:text-rose-500 transition-colors">
//                   {plan.displayName}
//                 </h3>
//                 <div className="flex items-baseline gap-1">
//                   <span className="text-4xl font-black">{plan.price}</span>
//                   <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
//                     / Month
//                   </span>
//                 </div>
//               </div>

//               <p className="text-zinc-400 text-xs leading-relaxed mb-8 font-medium">
//                 {plan.description}
//               </p>

//               <div className="space-y-4 mb-10 flex-grow">
//                 {plan.features.map((feature, i) => (
//                   <div key={i} className="flex items-center gap-3">
//                     <div className="w-5 h-5 bg-rose-600/10 rounded-full flex items-center justify-center flex-shrink-0">
//                       <FiCheck size={12} className="text-rose-600" />
//                     </div>
//                     <span className="text-xs font-bold text-zinc-300">
//                       {feature}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <button
//                 onClick={() => handleSubscribe(plan)}
//                 disabled={loadingPlan === plan.activity}
//                 className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all active:scale-[0.98] ${
//                   plan.color === "rose"
//                     ? "bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-900/20"
//                     : "bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800"
//                 }`}
//               >
//                 {loadingPlan === plan.activity ? "Verifying..." : "Select Plan"}
//               </button>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Community Mentors Section */}
//       <section className="bg-[#0b0b0b] border-y border-zinc-900 py-24 px-6 md:px-20">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
//             <div className="space-y-2">
//               <h2 className="text-4xl font-black tracking-tight">
//                 Community <span className="text-rose-600">Mentors</span>
//               </h2>
//               <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">
//                 Guided by Experience • Powered by Culture
//               </p>
//             </div>
//             <div className="flex items-center gap-4 bg-zinc-900/50 p-3 rounded-2xl border border-zinc-800">
//               <FiUsers className="text-rose-600" />
//               <span className="text-xs font-black uppercase tracking-widest">
//                 50+ Active Members
//               </span>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {communityMentors.map((mentor, idx) => (
//               <div key={idx} className="group text-center">
//                 <div className="relative mb-6 inline-block">
//                   <div className="absolute inset-0 bg-rose-600 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
//                   <img
//                     src={mentor.avatar}
//                     alt={mentor.name}
//                     className="w-32 h-32 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-zinc-800 group-hover:border-rose-600 relative z-10"
//                   />
//                 </div>
//                 <h3 className="text-lg font-bold mb-1">{mentor.name}</h3>
//                 <p className="text-rose-600 text-[10px] font-black uppercase tracking-widest mb-3">
//                   {mentor.role}
//                 </p>
//                 <p className="text-zinc-500 text-xs leading-relaxed font-medium px-4">
//                   {mentor.bio}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Market Intelligence",
    basePrice: 30,
    desc: "Entry-level access to global macro metadata streams and regulatory reporting feeds.",
    features: [
      "Real-time Macro Feeds",
      "Regulatory Alert API",
      "Market Sentiment Indices",
    ],
  },
  {
    name: "Operational Workflow",
    basePrice: 125,
    desc: "Standardized deployment of departmental accounting and automated trade orchestration.",
    features: [
      "Automated Trade Streams",
      "Workflow Logic Engine",
      "Yield Capture Webhooks",
    ],
  },
  {
    name: "Capital Pipeline",
    basePrice: 250,
    desc: "High-priority infrastructure for accelerated capital deployment and predictive modeling.",
    features: [
      "Priority Execution API",
      "Institutional Alpha Models",
      "Predictive Risk Hooks",
    ],
  },
  {
    name: "Treasury Oversight",
    basePrice: 500,
    desc: "Full-scale governance support for institutional treasury management and resource allocation.",
    features: [
      "Full Institutional API Access",
      "Audit-Ready Compliance Logs",
      "24/7 Dedicated Liquidity Support",
    ],
  },
];



const ComparisonMatrix = () => {
  const comparisonData = [
    {
      feature: "Execution Limits",
      guest: "50 ops/hr",
      basic: "500 ops/hr",
      pro: "5,000 ops/hr",
      impact: "Unlimited",
    },
    {
      feature: "Audit Retention",
      guest: "7 Days",
      basic: "30 Days",
      pro: "90 Days",
      impact: "Permanent",
    },
    {
      feature: "Service Level",
      guest: "Self-Serve",
      basic: "48h Response",
      pro: "4h Response",
      impact: "Dedicated Partner",
    },
    {
      feature: "Institutional Authority",
      guest: "None",
      basic: "Operational View",
      pro: "Full Executive Vote",
      impact: "Board Seat",
    },
  ];
  return (
    <section className="mt-32 border-t border-zinc-200 dark:border-zinc-900 pt-16">
      <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-12 text-center">
        Infrastructure Specifications
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-900">
              <th className="p-4 text-[9px] uppercase tracking-widest text-zinc-500">
                Vector
              </th>
              <th className="p-4 text-[9px] uppercase tracking-widest">
                Guest
              </th>
              <th className="p-4 text-[9px] uppercase tracking-widest">
                Basic
              </th>
              <th className="p-4 text-[9px] uppercase tracking-widest">Pro</th>
              <th className="p-4 text-[9px] uppercase tracking-widest">
                Impact
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row) => (
              <tr
                key={row.feature}
                className="border-b border-zinc-200 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
              >
                <td className="p-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {row.feature}
                </td>
                <td className="p-4 text-[10px] uppercase tracking-widest">
                  {row.guest}
                </td>
                <td className="p-4 text-[10px] uppercase tracking-widest">
                  {row.basic}
                </td>
                <td className="p-4 text-[10px] uppercase tracking-widest">
                  {row.pro}
                </td>
                <td className="p-4 text-[10px] uppercase tracking-widest">
                  {row.impact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default function BrowseMembership() {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const navigate = useNavigate();

  // const processedPlans = plans.map((p) => {
  //   const isAnnual = billingCycle === "annual";
  //   const displayPrice = isAnnual ? Math.floor(p.basePrice * 0.8) : p.basePrice;
  //   return {
  //     ...p,
  //     activity: planAdapter[p.name],
  //     displayPrice: `$${displayPrice}`,
  //     billingSuffix: isAnnual ? "/mo (billed annually)" : "/mo",
  //   };
  // });
const processedPlans = plans.map((p) => {
  const isAnnual = billingCycle === 'annual';
  
  // Transform "Market Intelligence" -> "MARKET_INTELLIGENCE"
  const baseKey = p.name.toUpperCase().replace(/\s+/g, '_');
  const activityKey = isAnnual ? `${baseKey}_ANNUAL` : `${baseKey}_MONTHLY`;
  
  const annualPrice = Math.floor(p.basePrice * 12 * 0.8);

  return {
    ...p,
    activity: activityKey, // Now this will be "MARKET_INTELLIGENCE_MONTHLY", etc.
    displayPrice: isAnnual ? `$${annualPrice}` : `$${p.basePrice}`,
    billingSuffix: isAnnual ? '/year (billed upfront)' : '/mo',
    savings: isAnnual ? `Save $${(p.basePrice * 12) - annualPrice} annually` : null
  };
});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) navigate("/signin");
    else setUser(userData);
  }, [navigate]);

  // const handleSubscribe = async (plan) => {
  //   console.log("Sending payload:", {
  //     activity: plan.activity,
  //     duration: "1",
  //     billingCycle: billingCycle,
  //   });

  //   setLoadingPlan(plan.activity);
  //   try {
  //     const res = await axios.post("/subscription/checkout", {
  //       activity: plan.activity, // This should be "Free trial", "Beginner players plan", etc.
  //       duration: "1",
  //       billingCycle: billingCycle,
  //     });
  //     window.location.href = res.data.url;
  //   } catch (err) {
  //     // This will tell us exactly why the backend rejected it
  //     console.error("Full Error Response:", err.response?.data);
  //   } finally {
  //     setLoadingPlan(null);
  //   }
  // };
  const handleSubscribe = async (plan) => {
    setLoadingPlan(plan.name);
    
    try {
      const res = await axios.post("/subscription/checkout", {
        activity: plan.activity, // This now sends the dynamic key
        duration: billingCycle === 'annual' ? "12" : "1",
        billingCycle: billingCycle,
      });
      
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Subscription error:", err.response?.data);
    } finally {
      setLoadingPlan(null);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-24">
        {/* Header */}
        <header className="mb-24 text-center">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-6">
            Choose Your{" "}
            <span className="text-zinc-400 dark:text-zinc-600">Instance.</span>
          </h1>
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">
            Transparent scaling for the Diaspora hub.
          </p>
        </header>
        <div className="flex justify-center mb-16">
          <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                billingCycle === "monthly"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-lg"
                  : "text-zinc-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                billingCycle === "annual"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-lg"
                  : "text-zinc-500"
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>
        {/* Pricing Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-[#050505]">
          {processedPlans.map((plan) => (
            <div
              key={plan.name}
              className="p-10  border-b md:border-b-0 md:border-r last:border-r-0 border-zinc-200 dark:border-zinc-900 flex flex-col"
            >
              <h3 className="text-lg font-black uppercase tracking-tighter mb-2">
                {plan.name}
              </h3>
              <div className="text-4xl font-black mb-6">
                {plan.displayPrice}
                <span className="text-xs text-zinc-500">/mo</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-8 h-10">
                {plan.desc}
              </p>
              <ul className=" md:pt-20 space-y-4 mb-10 flex-grow">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest"
                  >
                    <Check className="w-3 h-3 text-zinc-400" /> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan)}
                disabled={loadingPlan === plan.activity}
                className="w-full py-4 border border-zinc-300 dark:border-zinc-700 font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                {loadingPlan === plan.activity ? "Verifying..." : "Select Plan"}
              </button>
            </div>
          ))}
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-4 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#050505]">
          {processedPlans.map((plan) => (
            <div
              key={plan.name}
              className="p-10 border-b md:border-b-0 md:border-r last:border-r-0 border-zinc-200 dark:border-zinc-900 flex flex-col"
            >
              <h3 className="text-lg font-black uppercase tracking-tighter mb-2">
                {plan.name}
              </h3>
              <div className="text-4xl font-black mb-6">
                {plan.displayPrice}
                <span className="text-xs text-zinc-500 font-medium ml-1">
                  {plan.billingSuffix}
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-8 h-10">
                {plan.desc}
              </p>
              <ul className="md:pt-10 space-y-4 mb-10 flex-grow">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest"
                  >
                    <Check className="w-3 h-3 text-rose-600" /> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan)}
                disabled={loadingPlan === plan.activity}
                className="w-full py-4 border border-zinc-300 dark:border-zinc-700 font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              >
                {loadingPlan === plan.activity ? "Verifying..." : "Select Plan"}
              </button>
            </div>
          ))}
        </div>
        {/* Engineering Team/Mentors (Rebranded as 'System Architects') */}
        <section className="mt-32">
          <ComparisonMatrix />
        </section>
        <section className="mt-32">
          <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mb-12 text-center">
            System Architects
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Mentor cards using the same grayscale hover technique */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-zinc-200 dark:bg-zinc-900 rounded-full grayscale group-hover:grayscale-0 transition-all border border-zinc-300 dark:border-zinc-800" />
                <h4 className="text-xs font-bold uppercase tracking-widest mb-1">
                  Architect {i}
                </h4>
                <p className="text-[9px] uppercase tracking-widest text-zinc-500">
                  Lead Infrastructure
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
