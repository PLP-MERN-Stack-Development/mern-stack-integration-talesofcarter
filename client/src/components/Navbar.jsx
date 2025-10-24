import { IoBook } from "react-icons/io5";
import LoginBtn from "./LoginBtn";

function Navbar({ toggleSidebar }) {
  return (
    <div className="sticky top-0 z-100 bg-background/40 flex justify-between px-5 sm:px-5 md:px-10 lg:px-20 py-5 shadow">
      <div className="flex items-center gap-3">
        <IoBook className="text-primary text-4xl" />
        <h1 className="text-3xl font-bold">QuickBlog</h1>
      </div>
      <div className="flex gap-3">
        <LoginBtn />

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
