import { Link } from "react-router-dom";
import Logout from "./logout";

export default function Navbar(id) {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-xl font-bold">Imaginate</div>
            <span className="text-gray-400">/\</span>
            <div className="text-xl font-bold text-black"></div>
          </div>

          <nav className="space-x-6">
            <Link to={"/home"}>
              <a href="#" className="text-gray-700 hover:underline">
                Home
              </a>
            </Link>
            <Link to={`/user-profile/:id`}>
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
