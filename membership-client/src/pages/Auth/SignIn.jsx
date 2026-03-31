import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc"; 
import axios from "../../utils/axiosInstance";
import communityImg from "../../assets/wow.png"; 

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Enter your credentials to hit the court.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("/auth/login", form);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      navigate(data.user.role === "admin" ? "/admin/dashboard" : "/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] font-sans text-white flex items-center justify-center p-4 md:p-6 overflow-hidden relative">
      {/* Subtle Ambient Glow like the Landing Page */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-950/10 rounded-full blur-[120px] -z-0" />
      
      <div className="w-full max-w-7xl h-auto md:h-[750px] flex flex-col md:flex-row bg-[#0f0f0f] rounded-[40px] border border-zinc-800/50 shadow-2xl overflow-hidden z-10">
        
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
              "Connecting the court, <br />
              <span className="text-rose-600 text-opacity-80 font-bold italic">strengthen the community."</span>
            </h2>
            <div className="flex-1 max-h-[380px] overflow-hidden rounded-[32px] border border-zinc-800 shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <img
                src={communityImg}
                alt="Ethiopian Basketball Community"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>

          <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">
            GTA Hub • Established 2025
          </div>
        </div>

        {/* Right Side: Log In Form (The Dark Nucleus Style) */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-[#0d0d0d]">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Welcome back</h1>
              <p className="text-zinc-500 text-sm font-medium">
                Log in to manage your sessions and training library.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-500 text-xs font-bold text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-zinc-900/50 border border-zinc-800 text-white rounded-2xl focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600 outline-none transition-all placeholder:text-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                   <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Password</label>
                   <a href="#" className="text-[10px] font-bold text-rose-500 hover:text-white transition">Forgot?</a>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-zinc-900/50 border border-zinc-800 text-white rounded-2xl focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600 outline-none transition-all placeholder:text-zinc-700"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between ml-1 text-[11px] font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 uppercase tracking-wider">Remember details</span>
                  <button
                    type="button"
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`${
                      rememberMe ? "bg-rose-600" : "bg-zinc-800"
                    } relative inline-flex h-5 w-10 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none`}
                  >
                    <span
                      className={`${
                        rememberMe ? "translate-x-5" : "translate-x-0"
                      } inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200`}
                    />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-rose-900/20 disabled:opacity-50 active:scale-[0.98] mt-4"
              >
                {loading ? "Verifying..." : "Sign In to Hub"}
              </button>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 bg-[#0d0d0d] px-4 mx-auto w-fit">
                OR
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white py-4 rounded-2xl text-xs font-bold transition active:scale-[0.98]">
              <FcGoogle size={20} />
              <span className="uppercase tracking-widest">Continue with Google</span>
            </button>

            <p className="text-zinc-600 text-center mt-10 text-xs font-medium">
              New to the community?{" "}
              <Link
                to="/signup"
                className="text-white font-bold hover:text-rose-500 transition underline underline-offset-4"
              >
                Join the Family
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;