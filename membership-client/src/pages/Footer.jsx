import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-200 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Membership Portal. All rights
          reserved.
        </p>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="/About" className="hover:text-white transition">
            About
          </Link>
          <a href="#contact" className="hover:text-white transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
