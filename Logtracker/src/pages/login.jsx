import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  
  // Forgot Password Workflow States
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [codeSent, setCodeSent] = useState(false); // Controls Step 1 vs Step 2 view
  const [resetEmail, setResetEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Standard Login Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://hgt-monitor.onrender.com/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        navigate("/"); 
      } else {
        setError(data.error || "Invalid email or password.");
      }
    } catch (err) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Submit Email to Request Code
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://hgt-monitor.onrender.com/api/password-reset/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("A security code has been dispatched to your email inbox.");
        setCodeSent(true); // Switch view to Code validation entry
      } else {
        setError(data.error || "Failed to process password reset request.");
      }
    } catch (err) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit Code along with New Password
  const handleConfirmResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://hgt-monitor.onrender.com/api/password-reset-confirm/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: resetEmail,
          code: verificationCode,
          new_password: newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Reset state and direct user back to log in with new password
        setIsForgotPassword(false);
        setCodeSent(false);
        setResetEmail("");
        setVerificationCode("");
        setNewPassword("");
        setConfirmNewPassword("");
        setMessage("Password changed successfully! Please log in.");
      } else {
        setError(data.error || "Failed to reset password.");
      }
    } catch (err) {
      setError("Unable to connect to the server.");
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

      {/* Right Side: Form Block Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-slate-50 lg:bg-white">
        <div className="w-full max-w-md">
          
          {message && (
            <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 text-sm">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          {!isForgotPassword ? (
            /* --- STANDARD LOGIN VIEW --- */
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900">Login</h2>
                <p className="text-slate-500 mt-2">Enter your credentials to access your dashboard.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-semibold text-slate-700">Password</label>
                    <button 
                      type="button"
                      onClick={() => { setIsForgotPassword(true); setError(""); setMessage(""); }}
                      className="text-xs font-medium text-emerald-700 hover:underline"
                    >
                      Forgot password?
                    </button>
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

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-emerald-800 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-emerald-900 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? "Authenticating..." : "Login"}
                </button>
              </form>
            </>
          ) : !codeSent ? (
            /* --- FORGOT PASSWORD STEP 1: REQUEST CODE --- */
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900">Reset Password</h2>
                <p className="text-slate-500 mt-2">Enter your email address to receive a verification code.</p>
              </div>

              <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none transition bg-white"
                    placeholder="name@company.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-emerald-800 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-emerald-900 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? "Sending Code..." : "Send Verification Code"}
                </button>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => { setIsForgotPassword(false); setError(""); setMessage(""); }}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 underline"
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* --- FORGOT PASSWORD STEP 2: VERIFY CODE & UPDATE PASSWORD --- */
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900">Enter Verification Code</h2>
                <p className="text-slate-500 mt-2">Type the code sent via Brevo and set your new password.</p>
              </div>

              <form onSubmit={handleConfirmResetSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Verification Code</label>
                  <input
                    type="text"
                    required
                    maxLength="6"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none transition bg-white text-center font-bold text-lg tracking-widest"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none transition bg-white"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-emerald-500 outline-none transition bg-white"
                    placeholder="••••••••"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-emerald-800 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-emerald-900 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? "Resetting Password..." : "Update Password"}
                </button>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => { setCodeSent(false); setError(""); setMessage(""); }}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 underline"
                  >
                    Resend Code Email
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Persistent Signup Footer Link */}
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