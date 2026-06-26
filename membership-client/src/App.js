import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/User/Dashboard";
import BrowseMembership from "./pages/User/BrowseMembership";
import CancelSubscription from "./pages/User/CancelSubscription";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminSubscriptions from "./pages/Admin/AdminSubscription";
import RoleRoute from "./components/RoleRoute";
import AdminSettings from "./pages/Admin/AdminSettings";
import About from "./pages/User/About";
import Footer from "./pages/Footer";
import FAQ from "./pages/DetailPage/FAQ";
import TrainingPrograms from "./pages/DetailPage/TrainingPrograms";
import Community from "./pages/DetailPage/Community";
import Privacy from "./pages/DetailPage/Privacy";
import Contact from "./pages/DetailPage/Contact";
import Terms from "./pages/DetailPage/Terms";
import OurStory from "./pages/DetailPage/Story";

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    // Default to dark mode on first load
    return localStorage.getItem("theme") !== "light";
  });
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  return (
    <Router>
      {/* 1. Wrap everything in a div so we can use Flexbox to keep footer at the bottom */}
      <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-300">
        {/* 2. Main content area grows to push the footer down */}
        <main className="flex-grow">
          <Routes>
          <Route path="/" element={<Landing isDark={isDark} setIsDark={setIsDark} />} />
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/FAQs" element={<FAQ />} />
            <Route path="/Programs" element={<TrainingPrograms />} />
            <Route path="/community" element={<Community />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Terms" element={<Terms />} />
            <Route path="/our-story" element={<OurStory />} />

            {/* User Dashboard */}
            <Route
              path="/dashboard"
              element={
                <RoleRoute requiredRole="user">
                  <Dashboard />
                </RoleRoute>
              }
            />
            <Route
              path="/browse-memberships"
              element={
                <RoleRoute requiredRole="user">
                  <BrowseMembership />
                </RoleRoute>
              }
            />
            <Route
              path="/cancel-subscription"
              element={
                <RoleRoute requiredRole="user">
                  <CancelSubscription />
                </RoleRoute>
              }
            />
            <Route
              path="/About"
              element={
                <RoleRoute requiredRole="user">
                  <About />
                </RoleRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <RoleRoute requiredRole="admin">
                  <AdminDashboard />
                </RoleRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <RoleRoute requiredRole="admin">
                  <AdminUsers />
                </RoleRoute>
              }
            />
            <Route
              path="/admin/subscriptions"
              element={
                <RoleRoute requiredRole="admin">
                  <AdminSubscriptions />
                </RoleRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <RoleRoute requiredRole="admin">
                  <AdminSettings />
                </RoleRoute>
              }
            />
          </Routes>
        </main>

        {/* 3. Footer sits OUTSIDE Routes so it stays visible on every page */}
        <Footer />
      </div>
    </Router>
  );
}
