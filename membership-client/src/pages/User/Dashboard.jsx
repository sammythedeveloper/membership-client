import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import artImg from "../../assets/art.jpg";
import bookClubImg from "../../assets/bookclub.jpg";
import basketballImg from "../../assets/basketball.jpg";
import walkImg from "../../assets/walk.jpg";

// Map membership activity to imported images
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
  const navigate = useNavigate();

  // Load user info
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) navigate("/signin");
    else setUser(userData);
  }, [navigate]);

  // Fetch subscriptions
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

  const firstName =
    user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar userName={firstName} />

      <main className="flex-grow p-6 md:p-10">
        <h2 className="text-4xl font-bold mb-6 text-center">
          Welcome, {firstName}!
        </h2>
        <p className="text-black mb-10 text-center">
          Manage your memberships, subscriptions, and profile here.
        </p>

        {loadingSubscriptions ? (
          <p className="text-gray-500 text-center">Loading memberships...</p>
        ) : subscriptions.length === 0 ? (
          <p className="text-gray-500 text-center">
            You do not have any memberships yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptions.map((sub) => {
              const imgSrc = membershipImages[sub.activity?.trim()];

              return (
                <div
                  key={sub.id}
                  className="bg-white shadow-lg rounded-2xl flex flex-col sm:flex-row transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl min-h-[250px] overflow-hidden"
                >
                  {/* Left: Membership image */}
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt={sub.activity}
                      loading="lazy"
                      className="w-full sm:w-40 h-48 sm:h-auto object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none flex-shrink-0"
                    />
                  )}

                  {/* Right: Membership info */}
                  <div className="p-4 sm:p-6 flex flex-col justify-between text-left flex-1 overflow-hidden">
                    <h3 className="text-xl sm:text-2xl font-extralight mb-2 truncate">
                      {sub.activity}
                    </h3>
                    <p className="text-black mb-1 truncate">
                      <strong>Duration:</strong> {sub.duration} days
                    </p>
                    <p className="text-black mb-1 truncate">
                      <strong>Start Date:</strong>{" "}
                      {new Date(sub.start_date).toLocaleDateString()}
                    </p>
                    <p className="text-black mb-1 truncate">
                      <strong>End Date:</strong>{" "}
                      {new Date(sub.end_date).toLocaleDateString()}
                    </p>
                    <p
                      className={`font-extralight text-sm mt-3 truncate ${
                        sub.status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      Status: {sub.status.toUpperCase()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
