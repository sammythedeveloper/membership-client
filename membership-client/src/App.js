import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/User/Dashboard";
import BrowseMembership from "./pages/User/BrowseMembership";
import CancelSubscription from "./pages/User/CancelSubscription";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminSubscriptions from "./pages/AdminSubscription";
import RoleRoute from "./components/RoleRoute";
import AdminSettings from "./pages/AdminSettings";
import About from "./pages/User/About";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

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
    </Router>
  );
}
