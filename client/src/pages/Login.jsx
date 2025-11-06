import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);
    if (result.success) navigate("/");
  };

  return (
    <section className="min-h-screen bg-background/60 flex flex-col items-center justify-center py-20">
      <form
        className="bg-background/20 rounded-2xl shadow-md p-8 w-full max-w-md space-y-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-semibold text-gray-500 mb-2 text-center">
          Welcome back
        </h1>
        <div>
          <label className="block text-base font-medium text-gray-500 mb-2">
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200"
          />
        </div>
        <div>
          <label className="block text-base font-medium text-gray-500 mb-2">
            Password <span className="text-primary">*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white w-full py-3 rounded-lg font-medium hover:bg-primary/80 cursor-pointer transition-colors duration-200 disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
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
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
