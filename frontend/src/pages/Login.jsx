import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", form);
      console.log(response, "data");
      localStorage.setItem("token", response.data.token);
      setMsg("Login successful! Redirecting...");
      setIsError(false);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMsg(error.response?.data?.message || "An error occurred");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* LEFT PANEL — Brand / Visual */}
        <div className="md:w-2/5 bg-gradient-to-br from-indigo-900 to-blue-800 p-8 md:p-10 flex flex-col justify-between text-white relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full -ml-20 -mb-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-2xl">🛍️</span>
              <span className="text-2xl font-bold tracking-tight">
                ShopEase
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-3">
              Welcome
              <br />
              back to
              <br />
              your store.
            </h2>
            <p className="text-blue-100 text-sm max-w-xs mt-2">
              Sign in to continue shopping, track your orders, and pick up right
              where you left off.
            </p>
          </div>

          <div className="relative z-10 mt-10 md:mt-0">
            <div className="flex -space-x-2">
              {["JD", "AM", "KL", "SR"].map((initials, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-gray-800 ${
                    [
                      "bg-amber-400",
                      "bg-blue-300",
                      "bg-emerald-300",
                      "bg-rose-300",
                    ][i]
                  }`}
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-xs text-blue-100 mt-3">
              Trusted by 12k+ happy shoppers
            </p>
          </div>
        </div>

        {/* RIGHT PANEL — Login Form */}
        <div className="md:w-3/5 p-8 md:p-10 bg-white">
          <div className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Sign in to your ShopEase account.
            </p>

            {/* Message Alert */}
            {msg && (
              <div
                className={`mb-4 p-3 rounded-xl text-sm font-medium ${
                  isError
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "bg-green-50 text-green-600 border border-green-200"
                }`}
              >
                {msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Email address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    ✉️
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="alex@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-blue-600 font-medium hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    🔒
                  </span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-400">
                  New to ShopEase?
                </span>
              </div>
            </div>

            {/* Signup CTA */}
            <Link
              to="/signup"
              className="block w-full text-center border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-700 font-semibold py-2.5 px-4 rounded-xl transition duration-200"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
