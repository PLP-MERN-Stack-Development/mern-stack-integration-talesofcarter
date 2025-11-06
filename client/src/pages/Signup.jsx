import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    const result = await signup(
      formData.username,
      formData.email,
      formData.password
    );
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
          Signup
        </h1>
        <div>
          <label className="block text-base font-medium text-gray-500 mb-2">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your name"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-primary focus:outline-none transition-colors duration-200"
          />
        </div>
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
          {loading ? "Creating Account..." : "Register"}
        </button>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Signup;
