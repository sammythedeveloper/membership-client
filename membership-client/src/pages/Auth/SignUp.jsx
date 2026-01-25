// import { useState } from "react";
// import axios from "../../utils/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import Footer from "../Footer";

// const SignUp = () => {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const { data } = await axios.post("/auth/signup", form);

//       setSuccess("Account created successfully!");

//       // Save JWT token and user info if returned
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//       }
//       if (data.user) {
//         localStorage.setItem("user", JSON.stringify(data.user));
//         localStorage.setItem("role", data.user.role);
//       }

//       // Redirect based on role
//       if (data.user?.role === "admin") {
//         navigate("/admin/dashboard", { replace: true });
//       } else {
//         navigate("/dashboard", { replace: true });
//       }
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       setError(err.response?.data?.message || "Signup failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <div className="flex-grow flex items-center justify-center px-4">
//         <div className="bg-rose-950 w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-800">

//           <h2 className="text-3xl font-bold text-white text-center mb-6">
//             Create Account
//           </h2>

//           {error && <p className="text-red-400 text-center mb-2">{error}</p>}
//           {success && <p className="text-green-500 text-center mb-2">{success}</p>}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               name="name"
//               type="text"
//               placeholder="Full Name"
//               onChange={handleChange}
//               className="w-full px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
//             />

//             <input
//               name="email"
//               type="email"
//               placeholder="Email"
//               onChange={handleChange}
//               className="w-full px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
//             />

//              <div className="relative">
//                        <input
//                          name="password"
//                          type={showPassword ? "text" : "password"}
//                          placeholder="Password"
//                          value={form.password}
//                          onChange={handleChange}
//                          className="w-full px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
//                        />
//                        <div
//                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
//                          onClick={() => setShowPassword(!showPassword)}
//                        >
//                          {showPassword ? (
//                            <AiFillEyeInvisible size={20} />
//                          ) : (
//                            <AiFillEye size={20} />
//                          )}
//                        </div>
//                      </div>

//             <button
//               type="submit"
//               className="w-full bg-red-50 hover:bg-black hover:text-white transition py-3 rounded-lg text-sm font-medium"
//             >
//               Sign Up
//             </button>
//           </form>

//           <p className="text-white text-center mt-4 text-sm">
//             Already have an account?{" "}
//             <a href="/signin" className="text-white hover:underline">
//               Sign In
//             </a>
//           </p>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default SignUp;
import { useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Footer from "../Footer";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);
      }

      if (data.user?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow flex flex-col md:flex-row items-center justify-center px-4 md:px-12 gap-10">
        <div className="w-full md:w-1/2 max-w-md text-black flex flex-col justify-center space-y-4">
          <h2 className="text-5xl font-bold mb-4">Welcome to HoopMaster!</h2>
          <p className="text-black">
            Join our basketball training membership app where your skills meet
            real practice. Based on your schedule and selected skill plan,
            you'll train with sessions organized by the community.
          </p>
          <p className="text-black">
            Track your progress, improve your game, and connect with other
            players. Every session is crafted to help you level up and master
            your basketball skills!
          </p>
        </div>

        <div className="bg-rose-950 w-full md:w-1/2 max-w-md p-8 rounded-2xl shadow-xl border border-gray-800 mb-10   ">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Create Account
          </h2>

          {error && <p className="text-red-400 text-center mb-2">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-2">{success}</p>
          )}

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

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 text-black rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </div>
            </div>

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
