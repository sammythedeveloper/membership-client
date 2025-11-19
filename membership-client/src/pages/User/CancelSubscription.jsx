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

export default function CancelSubscription() {
  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    subId: null,
  });
  const navigate = useNavigate();

  // Load user info
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/signin");
    } else {
      setUser(userData);
    }
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
        setLoading(false);
      }
    };

    if (user) fetchSubscriptions();
  }, [user]);

  const handleCancel = async () => {
    const id = confirmModal.subId;
    try {
      const res = await axios.delete(`/subscription/${id}`);
      setMessage(res.data.message);
      setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Failed to cancel subscription."
      );
    } finally {
      setConfirmModal({ show: false, subId: null });
    }
  };

  if (!user) return null;

  const firstName =
    user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar userName={firstName} />

      <main className="flex-grow p-10">
        <h2 className="text-4xl font-bold mb-6 text-center">
          Cancel Subscriptions
        </h2>
        <p className="text-black mb-10 text-center">
          Click “Cancel” to remove a subscription.
        </p>
        {message && (
          <p className="text-center mb-6 text-red-600 font-semibold">
            {message}
          </p>
        )}
        {loading ? (
          <p className="text-gray-500 text-center">Loading subscriptions...</p>
        ) : subscriptions.length === 0 ? (
          <p className="text-gray-500 text-center">
            You do not have any active subscriptions.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                      className="w-full sm:w-40 h-48 sm:h-auto object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none flex-shrink-0"
                    />
                  )}

                  {/* Right: Membership info */}
                  <div className="p-6 flex flex-col justify-between text-left">
                    <h3 className="text-2xl font-extralight mb-2">
                      {sub.activity}
                    </h3>
                    <p className="text-black mb-1">
                      <strong>Duration:</strong> {sub.duration} days
                    </p>
                    <p className="text-black mb-1">
                      <strong>Start Date:</strong>{" "}
                      {new Date(sub.start_date).toLocaleDateString()}
                    </p>
                    <p className="text-black mb-1">
                      <strong>End Date:</strong>{" "}
                      {new Date(sub.end_date).toLocaleDateString()}
                    </p>
                    <p
                      className={`font-semibold mt-3 ${
                        sub.status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      Status: {sub.status.toUpperCase()}
                    </p>
                    <button
                      onClick={() =>
                        setConfirmModal({ show: true, subId: sub.id })
                      }
                      className="mt-4 bg-rose-950 hover:bg-black text-white py-2 px-4 rounded-xl transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Confirmation Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 sm:w-96">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to cancel this subscription?
            </h3>
            <p className="text-gray-700 mb-6">This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmModal({ show: false, subId: null })}
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-xl transition-all duration-300"
              >
                No
              </button>
              <button
                onClick={handleCancel}
                className="bg-rose-950 hover:bg-red-500 text-white py-2 px-4 rounded-xl transition-all duration-300"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
