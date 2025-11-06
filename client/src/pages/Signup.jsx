import { Link } from "react-router";

function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="min-h-screen bg-background/60 flex flex-col items-center justify-center py-20">
      <form
        action=""
        className="bg-background/20 rounded-2xl shadow-md p-8 w-full max-w-md space-y-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-semibold text-gray-500 mb-2 text-center">
          Signup
        </h1>
        <div>
          <label
            htmlFor=""
            className="block text-base font-medium text-gray-500 mb-2"
          >
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your name here"
            className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-primary/20 focus:outline-none transition-colors duration-200"
          />
        </div>
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
            className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-primary/20 focus:outline-none transition-colors duration-200"
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
            className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-primary/20 focus:outline-none transition-colors duration-200"
          />
        </div>

        <button className="bg-primary text-white w-full py-3 rounded-lg font-medium hover:bg-primary/80 cursor-pointer transition-colors duration-200">
          Register
        </button>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Signup;
