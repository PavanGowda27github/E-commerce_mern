import { useState } from "react";
import api from "../api/axios";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/signup", form);
      setMsg(response.data.message);
      setIsError(false);
    } catch (error) {
      setMsg(
        error.response?.data?.msg || "An error occurred. Please try again.",
      );
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
              Join the
              <br />
              shopping
              <br />
              revolution.
            </h2>
            <p className="text-blue-100 text-sm max-w-xs mt-2">
              Create an account to unlock exclusive deals, fast checkout, and
              personalized picks.
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

        {/* RIGHT PANEL — Signup Form */}
        <div className="md:w-3/5 p-8 md:p-10 bg-white">
          <div className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Create Account
            </h1>
            <p className="text-gray-500 text-sm mb-6">It's quick and easy.</p>

            {/* Message Alert */}
            {msg && (
              <div
                className={`mb-4 p-3 rounded-xl text-sm font-medium ${
                  isError
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "bg-blue-50 text-blue-600 border border-blue-200"
                }`}
              >
                {msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Full name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    👤
                  </span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Alex Johnson"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    🔒
                  </span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">
                  Use 8+ characters with a mix of letters, numbers & symbols.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
