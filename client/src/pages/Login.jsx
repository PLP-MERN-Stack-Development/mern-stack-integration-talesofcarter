import { Link } from "react-router";

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="min-h-screen bg-background/60 flex flex-col items-center justify-center">
      <form
        action=""
        className="bg-background/20 rounded-2xl shadow-md p-8 w-full max-w-md space-y-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-semibold text-gray-500 mb-2 text-center">
          Welcome back
        </h1>
        <div>
          <label
            htmlFor=""
            className="block text-base font-medium text-gray-500 mb-2"
          >
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            placeholder="johndoe@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-[#2F6D3E] focus:outline-none transition-colors duration-200"
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="block text-base font-medium text-gray-500 mb-2"
          >
            Password <span className="text-primary">*</span>
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-[#2F6D3E] focus:outline-none transition-colors duration-200"
          />
        </div>
        <button className="bg-primary text-white w-full py-3 rounded-lg font-medium hover:bg-primary/80 cursor-pointer transition-colors duration-200">
          Login
        </button>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-600 cursor-pointer">
            <input type="checkbox" className="mr-2 rounded" />
            Remember me
          </label>
          <a href="#" className="text-primary hover:underline">
            Forgot password?
          </a>
        </div>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-medium hover:underline cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
