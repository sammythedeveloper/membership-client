// components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ userName }) {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  };

  return (
    <>
      <nav className="bg-rose-950 text-white px-6 py-10 flex justify-between items-center">
        <Link to="/dashboard">
          <h1 className="text-xl font-extralight">Membership Portal</h1>
        </Link>
        <ul className="flex gap-6">
          <li>
            <Link to="/browse-memberships" className="hover:underline text-sm">
              Browse Membership
            </Link>
          </li>
          <li>
            <Link to="/cancel-subscription" className="hover:underline text-sm">
              Cancel Subscription
            </Link>
          </li>
          <li>
            <Link to="/About" className="hover:underline text-sm">
              About
            </Link>
          </li>
          <li>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="hover:underline text-sm"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Confirm Logout</h3>
            <p className="mb-6">
              Are you sure you want to log out? You will need to sign in again.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                No
              </button>
              <button
                onClick={handleSignOut}
                className="py-2 px-4 rounded-md bg-red-600 hover:bg-green-600 hover:text-white "
              >
                Yes, Sure
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
