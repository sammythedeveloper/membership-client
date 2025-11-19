import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import axios from "../../utils/axiosInstance"; // ✅ use your axios instance

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Use axios instance
      const { data } = await axios.post("/auth/login", form);

      // Save user info + token + role
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      // Redirect based on role
      if (data.user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-rose-950 w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-800">

          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Welcome Back
          </h2>

          {error && <p className="text-red-400 text-center mb-2">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-50 hover:bg-black hover:text-white transition py-3 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-white text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <a href="/signup" className="text-white hover:underline text-sm">
              Create one
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignIn;
