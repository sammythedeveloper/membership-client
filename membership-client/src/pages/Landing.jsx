import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-rose-950 flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold text-black mb-6 text-center">
        Welcome to <span className="text-white">Membership Portal</span>
      </h1>

      <p className="text-white text-lg font-extralight max-w-xl text-center mb-10">
        Manage your membership, access exclusive features, and stay connected.
      </p>

      <div className="flex gap-5">
        <Link
          to="/signup"
          className="px-6 py-3 bg-black text-white rounded-xl font-extralight hover:bg-white hover:text-black transition"
        >
          Sign Up
        </Link>

        <Link
          to="/signin"
          className="px-6 py-3 border bg-white rounded-xl font-extralight  hover:bg-black hover:text-white transition"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
