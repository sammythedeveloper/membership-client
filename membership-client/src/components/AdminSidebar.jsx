import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  return (
    <aside className="w-64 bg-rose-950 text-white p-6 flex flex-col">
      <h1 className="text-3xl font-extralight mb-10">Admin Panel</h1>

      <nav className="flex flex-col gap-2 text-sm -mx-6">
        <Link
          to="/admin/dashboard"
          className="block w-full font-extralight py-3 px-6 hover:bg-black"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/users"
          className="block w-full font-extralight py-3 px-6 hover:bg-black"
        >
          Users
        </Link>
        <Link
          to="/admin/subscriptions"
          className="block w-full font-extralight py-3 px-6 hover:bg-black"
        >
          Subscriptions
        </Link>
        <Link
          to="/admin/settings"
          className="block w-full font-extralight py-3 px-6 hover:bg-black"
        >
          Settings
        </Link>
        <button
          onClick={() => setShowLogoutModal(true)}
          className="block w-full font-extralight text-left mt-4 py-3 px-6 text-white hover:text-red-600 hover:bg-black"
        >
          Sign Out
        </button>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black rounded-xl p-6 w-96">
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
    </aside>
  );
}
