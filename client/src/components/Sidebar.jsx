import { NavLink } from "react-router";
import { TfiClose } from "react-icons/tfi";
import { TbEdit } from "react-icons/tb";
import { CiLogin } from "react-icons/ci";
import {
  HiOutlineHome,
  HiOutlinePencilAlt,
  HiOutlinePhone,
} from "react-icons/hi";
import { RiDoubleQuotesL } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";

function Sidebar({ openSidebar, toggleSidebar }) {
  const navItems = [
    { label: "Home", link: "/", icon: HiOutlineHome },
    { label: "Blog", link: "/blog", icon: RiDoubleQuotesL },
    { label: "Post", link: "/post", icon: HiOutlinePencilAlt },
    { label: "Contact", link: "/contact", icon: HiOutlinePhone },
  ];

  return (
    <AnimatePresence>
      {openSidebar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        ></motion.div>
      )}

      {openSidebar && (
        <motion.aside
          key="sidebar"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`bg-white fixed top-0 z-150 right-0 h-full w-1/3 max-w-xs shadow-xl flex flex-col`}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between items-center p-4 border-b border-primary/10">
              <h2 className="text-xl font-semibold hidden md:block lg:block">
                Quickblog
              </h2>
              <button
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none cursor-pointer transition-colors duration-500 ease-in-out"
                onClick={toggleSidebar}
              >
                <TfiClose className="h-5 w-5" />
              </button>
            </div>

            <nav className="grow">
              <ul className="flex flex-col p-4 space-y-2 text-left">
                {navItems.map((item) => {
                  return (
                    <li key={item.label}>
                      <NavLink
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors ${
                            isActive
                              ? "bg-primary text-white"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          }`
                        }
                        to={item.link}
                        onClick={toggleSidebar}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="hidden md:block lg:block">
                          {item.label}
                        </span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-4 border-t border-gray-200">
              <NavLink to="/login">
                <button className="flex items-center justify-between space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-colors w-full duration-500 cursor-pointer">
                  <span>Login</span>
                  <CiLogin className="text-2xl" />
                </button>
              </NavLink>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
export default Sidebar;
