import { NavLink } from "react-router";
import { TfiClose } from "react-icons/tfi";
import { CiLogin } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import {
  HiOutlineHome,
  HiOutlinePencilAlt,
  HiOutlinePhone,
} from "react-icons/hi";
import { RiDoubleQuotesL } from "react-icons/ri";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function Sidebar({ openSidebar, toggleSidebar }) {
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Home", link: "/", icon: HiOutlineHome },
    { label: "Blog", link: "/blog", icon: RiDoubleQuotesL },
    { label: "Post", link: "/post", icon: HiOutlinePencilAlt },
    { label: "Contact", link: "/contact", icon: HiOutlinePhone },
  ];

  const handleLogout = () => {
    logout();
    toggleSidebar();
  };

  return (
    <AnimatePresence>
      {openSidebar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        ></motion.div>
      )}

      {openSidebar && (
        <motion.aside
          key="sidebar"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white fixed top-0 z-50 right-0 h-full w-[280px] sm:w-[320px] md:w-[360px] shadow-2xl flex flex-col"
        >
          <div className="flex flex-col justify-between h-full">
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Quickblog
              </h2>
              <button
                className="p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all duration-200"
                onClick={toggleSidebar}
                aria-label="Close sidebar"
              >
                <TfiClose className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4">
              <ul className="flex flex-col space-y-1.5">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      className={({ isActive }) =>
                        `flex items-center gap-4 rounded-xl px-4 py-3.5 font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-primary text-white shadow-md shadow-primary/20"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100"
                        }`
                      }
                      to={item.link}
                      onClick={toggleSidebar}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span className="text-[15px]">{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Auth Section */}
            <div className="p-5 border-t border-gray-200 bg-gray-50/50">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                    <div className="w-11 h-11 rounded-full bg-linear-to-br from-primary to-primary/80 text-white flex items-center justify-center font-bold text-base shadow-md shrink-0">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {user.username}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 transition-all duration-200 px-4 py-2.5 rounded-lg font-medium text-sm active:scale-95"
                    title="Logout"
                  >
                    <FiLogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <NavLink to="/login" onClick={toggleSidebar}>
                  <button className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-lg hover:bg-primary/90 active:scale-95 transition-all duration-200 w-full font-semibold shadow-lg shadow-primary/20 cursor-pointer">
                    <span className="text-[15px]">Login</span>
                    <CiLogin className="text-xl" />
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
