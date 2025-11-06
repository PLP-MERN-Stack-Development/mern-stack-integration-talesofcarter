import { IoBook } from "react-icons/io5";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { CiLogin } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";

function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();

  return (
    <div className="sticky top-0 z-50 bg-gray-100 flex justify-between px-5 sm:px-5 md:px-10 lg:px-20 py-5 shadow">
      <Link to="/" className="flex items-center gap-3">
        <IoBook className="text-primary text-4xl" />
        <h1 className="text-3xl font-bold">QuickBlog</h1>
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                {user.username[0].toUpperCase()}
              </div>
              <span className="text-gray-700 font-medium">{user.username}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1 text-primary hover:text-orange-400 font-medium transition cursor-pointer"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <Link to="/login" className="hidden md:block">
            <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:text-orange-400 font-medium transition cursor-pointer">
              <span>Login</span>
              <CiLogin className="text-xl" />
            </button>
          </Link>
        )}

        {/* Hamburger Menu - Always visible */}
        <button
          className="flex flex-col justify-around w-10 h-10 p-1 group focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
          onClick={toggleSidebar}
        >
          <div className="h-0.5 bg-gray-800 rounded transition-all duration-300 group-hover:bg-primary"></div>
          <div className="h-0.5 bg-gray-800 rounded transition-all duration-300 group-hover:bg-primary"></div>
          <div className="h-0.5 bg-gray-800 rounded transition-all duration-300 group-hover:bg-primary"></div>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
