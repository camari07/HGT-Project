import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Corrected: Perfectly matches your active Render routing path without a trailing slash
      const response = await fetch("https://hgt-monitor.onrender.com/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        // Requires manual login after account creation
        navigate("/login"); 
      } else {
        setError(data.error || "Signup failed. Please try again.");
        console.error("Signup failed:", data);
      }
    } catch (err) {
      setError("Server connection failed. Is the backend running?");
      console.error("Fetch error:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Side: Visual Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-900 relative items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-md text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Join the Future of Precision Farming</h1>
          <p className="text-emerald-100 text-lg">
            Access advanced irrigation diagnostics, greenhouse maintenance, and agronomy insights tailored for your farm.
          </p>
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900">Create Account</h2>
            <p className="text-slate-500 mt-2">Start managing your installations today.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">User Name</label>
              <input
                name="username"
                type="text"
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition bg-slate-50"
                placeholder="e.g. FarmerJohn"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition bg-slate-50"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition bg-slate-50"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition bg-slate-50"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-emerald-800 transition transform hover:-translate-y-0.5 active:scale-95 mt-4"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center mt-8 text-slate-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-700 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;