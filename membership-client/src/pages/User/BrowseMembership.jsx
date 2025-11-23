import { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../Footer";

const availablePlans = [
  {
    activity: "Art & Sketch Membership",
    duration: "1",
    price: "$30/month",
    description:
      "Engage with fellow artists, sketch weekly, learn new techniques, and share your artwork in a collaborative environment.",
    frequency: "Weekly sessions (4 per month)",
    accommodations: "Materials provided: sketch pads, pencils, and colors",
    trial: "7-day free trial",
    cancel: "Cancel anytime before the next billing cycle",
  },
  {
    activity: "Book Club Membership",
    duration: "3",
    price: "$25/month",
    description:
      "Join our monthly book discussions, get access to curated reading lists, and interact with other book lovers.",
    frequency: "Monthly meetups",
    accommodations: "Book materials included",
    trial: "30-day free trial",
    cancel: "Cancel anytime before next month",
  },
  {
    activity: "Basketball Training Membership",
    duration: "6",
    price: "$50/month",
    description:
      "Train with professional coaches, participate in drills and games, and improve your basketball skills.",
    frequency: "Twice a week",
    accommodations: "Access to gym and training equipment",
    trial: "First session free",
    cancel: "Cancel anytime with 7 days notice",
  },
  {
    activity: "Walking Club Membership",
    duration: "12",
    price: "$15/month",
    description:
      "Join our weekly walking sessions in scenic areas, track your fitness, and socialize with fellow walkers.",
    frequency: "Weekly walks",
    accommodations: "Guided routes and fitness tracking",
    trial: "7-day free trial",
    cancel: "Cancel anytime",
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
      console.error("Checkout error →", err);
      setMessage("Failed to start checkout. Try again later.");
    } finally {
      setLoadingPlan(null);
    }
  };

  if (!user) return null;

  const firstName =
    user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar userName={firstName} />

      <main className="flex-grow p-10">
        <h2 className="text-3xl font-extralight mb-8 text-center">
          Browse Membership Plans
        </h2>

        {message && (
          <p className="text-center mb-6 text-green-600 font-semibold">
            {message}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {availablePlans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-between transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-extralight mb-3 text-red-800">
                {plan.activity}
              </h3>
              <p className="text-black mb-2">
                <strong>Price:</strong> {plan.price}
              </p>
              <p className="text-black mb-2">
                <strong>Duration:</strong> {plan.duration} month(s)
              </p>
              <p className="text-black mb-2">
                <strong>Description:</strong> {plan.description}
              </p>
              <p className="text-black mb-2">
                <strong>Frequency:</strong> {plan.frequency}
              </p>
              <p className="text-black mb-2">
                <strong>Accommodations:</strong> {plan.accommodations}
              </p>
              <p className="text-black mb-2">
                <strong>Trial:</strong> {plan.trial}
              </p>
              <p className="text-black mb-4">
                <strong>Cancel Policy:</strong> {plan.cancel}
              </p>
              <button
                onClick={() => handleSubscribe(plan)}
                disabled={loadingPlan === plan.activity}
                className="bg-rose-950 hover:bg-black text-white py-3 px-6 rounded-xl font-extralight transition-all duration-300"
              >
                {loadingPlan === plan.activity ? "Processing..." : "Subscribe"}
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
