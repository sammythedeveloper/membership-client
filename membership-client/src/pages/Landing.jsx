import { Link } from "react-router-dom";
import basketballImg from "../assets/basketball.jpg";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-rose-950 to-red-700 flex flex-col md:flex-row items-center justify-center px-6 md:px-20 gap-10">
      
      {/* Text Section */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Level Up Your <span className="text-yellow-400">Basketball Skills</span>
        </h1>

        <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-lg">
          Join our community-driven basketball training platform. Track your progress, join practice sessions, 
          and train smartly based on your skill level and schedule.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
          <Link
            to="/signup"
            className="px-6 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-white hover:text-black transition transform hover:-translate-y-1"
          >
            Sign Up
          </Link>

          <Link
            to="/signin"
            className="px-6 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-black transition transform hover:-translate-y-1"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 flex justify-center mb-2">
        <img
          src={basketballImg}
          alt="Basketball Training"
          className="w-full max-w-md rounded-xl shadow-2xl"
        />
      </div>
    </div>
  );
}
