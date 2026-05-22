import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Corrected: Pointing directly to your active live Render application path
      const response = await fetch("https://hgt-monitor.onrender.com/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        console.log("Login successful");
        setIsLoggedIn(true);
        navigate("/"); // Navigate to home page after success
      } else {
        setError(data.error || "Invalid email or password.");
        console.error("Login failed:", data);
      }
    } catch (err) {
      setError("Unable to connect to the server.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Side: Branding/Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-950 relative items-center justify-center p-12">
        <div className="absolute inset-0 opacity-25 bg-[url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome Back</h1>
          <div className="h-1 w-20 bg-emerald-500 mb-6"></div>
          <p className="text-emerald-100 text-lg leading-relaxed">
            Log in to monitor your irrigation schedules, check greenhouse climate data, and access your agronomy reports.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-slate-50 lg:bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900">Login</h2>
            <p className="text-slate-500 mt-2">Enter your credentials to access your dashboard.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none transition bg-white"
                placeholder="name@company.com"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs font-medium text-emerald-700 hover:underline">Forgot password?</a>
              </div>
              <input
                name="password"
                type="password"
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none transition bg-white"
                placeholder="••••••••"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-emerald-800 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-emerald-900 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center mt-10 text-slate-600 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-emerald-700 font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;