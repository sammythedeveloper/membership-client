// components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ userName }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signin", { replace: true }); // replace prevents back-button access
  };

  return (
    <nav className="bg-rose-950 text-white px-6 py-10 flex justify-between items-center">
      <Link to="/dashboard" ><h1 className="text-xl font-extralight">Membership Portal</h1></Link>
      <ul className="flex gap-6">
        <li>
          <Link to="/browse-memberships" className="hover:underline text-sm">
            Browse Membership
          </Link>
        </li>
        <li>
          <Link to="/cancel-subscription" className="hover:underline text-sm">
            Cancel Subscription
          </Link>
        </li>
        <li>
          <Link to="/About" className="hover:underline text-sm">
            About
          </Link>
        </li>
        <li>
          <button onClick={handleSignOut} className="hover:underline text-sm">
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
}
