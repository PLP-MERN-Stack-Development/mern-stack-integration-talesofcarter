import { Link } from "react-router";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue to your blog
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#df6c4f] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#df6c4f]"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm">
            Don't have an account?
            <Link
              to="/signup"
              className="font-medium text-[#df6c4f] hover:text-opacity-80 transition duration-150 ease-in-out"
            >
              Sign Up here
            </Link>
          </p>
        </div>
        s
      </div>
    </div>
  );
};

export default Login;
