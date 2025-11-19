import { useState } from "react";
import axios from "../../utils/axiosInstance"; // ✅ use your axios instance
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { data } = await axios.post("/auth/signup", form);

      setSuccess("Account created successfully!");

      // Save JWT token and user info if returned
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);
      }

      // Redirect based on role
      if (data.user?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-rose-950 w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-800">
          
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Create Account
          </h2>

          {error && <p className="text-red-400 text-center mb-2">{error}</p>}
          {success && <p className="text-green-500 text-center mb-2">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-red-50 hover:bg-black hover:text-white transition py-3 rounded-lg text-sm font-medium"
            >
              Sign Up
            </button>
          </form>

          <p className="text-white text-center mt-4 text-sm">
            Already have an account?{" "}
            <a href="/signin" className="text-white hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
