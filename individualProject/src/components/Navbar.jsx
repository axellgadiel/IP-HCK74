import { Link } from "react-router-dom";
import Logout from "../util/Logout";
import Profile from "../util/UserProfile";

export default function Navbar() {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Left Side (Logo/Title) */}
          <div className="flex items-center space-x-2">
            <div className="text-xl font-bold">Text to image</div>
            <span className="text-gray-400">/\</span>
            <div className="text-xl font-bold text-black"></div>
          </div>

          {/* Right Side (Links) */}
          <nav className="space-x-6">
            <Link to={"/home"}>
              <a href="#" className="text-gray-700 hover:underline">
                Home
              </a>
            </Link>
            <a href="#" className="text-gray-700 hover:underline">
              B
            </a>
            <Link to={"/user-profile"}>
              <a href="#" className="text-gray-700 hover:underline">
                Profile
              </a>
            </Link>
            <Logout />
          </nav>
        </div>
      </header>
    </>
  );
}
