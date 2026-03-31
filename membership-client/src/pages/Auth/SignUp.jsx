import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "../../utils/axiosInstance";
import communityImg from "../../assets/wow.png";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields to join.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("/auth/signup", form);
      setSuccess("Account created successfully!");

      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);
      }

      // Short delay so they can see the success message
      setTimeout(() => {
        if (data.user?.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] font-sans text-white flex items-center justify-center p-4 md:p-6 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rose-950/10 rounded-full blur-[120px] -z-0" />

      <div className="w-full max-w-7xl h-auto md:h-[780px] flex flex-col md:flex-row bg-[#0f0f0f] rounded-[40px] border border-zinc-800/50 shadow-2xl overflow-hidden z-10">
        {/* Left Side: Community Image Panel */}
        <div className="hidden md:flex md:w-1/2 p-12 lg:p-16 flex-col justify-between relative bg-gradient-to-br from-zinc-900 to-[#0f0f0f] border-r border-zinc-800/50">
          <Link to="/">
            <div className="relative z-10 flex items-center gap-2">
              <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-white font-bold">
                ሀ
              </div>
              <span className="font-black text-xl tracking-tighter text-white">
                MEMBERSHIP
              </span>
            </div>
          </Link>

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-white">
              "Your game starts <br />
              <span className="text-rose-600 text-opacity-80 font-bold italic">
                with your community."
              </span>
            </h2>
            <div className="flex-1 max-h-[380px] overflow-hidden rounded-[32px] border border-zinc-800 shadow-2xl rotate-[2deg] hover:rotate-0 transition-transform duration-500">
              <img
                src={communityImg}
                alt="Ethiopian Basketball Community"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>

          <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">
            Join the GTA Network • 2025
          </div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-[#0d0d0d]">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
                Create Account
              </h1>
              <p className="text-zinc-500 text-sm font-medium">
                Join the premier hub for Ethiopian basketball in Toronto.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-500 text-xs font-bold text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-500 text-xs font-bold text-center">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Elias Tadesse"
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-zinc-900/50 border border-zinc-800 text-white rounded-2xl focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600 outline-none transition-all placeholder:text-zinc-700 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-zinc-900/50 border border-zinc-800 text-white rounded-2xl focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600 outline-none transition-all placeholder:text-zinc-700 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-zinc-900/50 border border-zinc-800 text-white rounded-2xl focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600 outline-none transition-all placeholder:text-zinc-700 text-sm"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible size={20} />
                    ) : (
                      <AiFillEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-rose-900/20 disabled:opacity-50 active:scale-[0.98] mt-4"
              >
                {loading ? "Creating Account..." : "Join the Community"}
              </button>
            </form>
            <p className="text-zinc-600 text-center mt-8 text-xs font-medium">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-white font-bold hover:text-rose-500 transition underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
