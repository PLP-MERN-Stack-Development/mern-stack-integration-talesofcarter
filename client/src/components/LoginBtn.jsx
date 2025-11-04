import { CiLogin } from "react-icons/ci";
import { NavLink } from "react-router";

function LoginBtn() {
  return (
    <div>
      <NavLink to="/login">
        <button className="hidden md:flex lg:flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-colors duration-500 cursor-pointer">
          <span>Login</span>
          <CiLogin className="text-2xl" />
        </button>
      </NavLink>
    </div>
  );
}

export default LoginBtn;
