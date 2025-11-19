import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch admin info from localStorage
        const userData = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
    
        if (!userData || userData.role !== "admin" || !token) {
          // Redirect if not admin
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
          onClick={handleSignOut}
          className="block w-full font-extralight text-left mt-4 py-3 px-6 text-white hover:text-red-600 hover:bg-black"
        >
          Sign Out
        </button>
      </nav>
    </aside>
  );
}
