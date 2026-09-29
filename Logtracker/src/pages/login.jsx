import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { activeBackend, signIn } from "./backend";
import {
  InlineError,
  inputClass,
  labelClass,
  primaryButtonClass,
} from "./FormLayout";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await signIn({ email: email.trim(), password });
      setIsLoggedIn?.(true);
      toast.success("Welcome back");
      navigate("/home", { replace: true });
    } catch (requestError) {
      setError(requestError?.message || "Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-[100dvh] bg-slate-50 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="hidden bg-emerald-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
          Farm LogTracker
        </p>
        <div className="max-w-xl">
          <p className="text-4xl font-bold leading-tight">
            Better field records. Clearer farm decisions.
          </p>
          <p className="mt-5 text-lg leading-8 text-emerald-100">
            Keep irrigation, agronomy, maintenance and support records together
            wherever the work happens.
          </p>
        </div>
        <p className="text-sm text-emerald-200">Holland Greentech</p>
      </section>

      <section className="flex items-center px-4 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          
         
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
            Sign in
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Access your farm activities and operational records.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className={labelClass} htmlFor="email">
                Email address
              </label>
              <input
                className={inputClass}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="password">
                Password
              </label>
              <input
                className={inputClass}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
              />
            </div>

            <InlineError>{error}</InlineError>

            <button
              className={`${primaryButtonClass} !w-full`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-emerald-800 underline-offset-4 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;



/*
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

    try {
      const response = await fetch(`${baseUrl}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.detail || data.error || "The email or password is incorrect."
        );
      }

      if (!data.token) {
        throw new Error("The server did not return an authentication token.");
      }

      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      navigate("/home", { replace: true });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Holland Greentech
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Access your farm activities and operational records.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
          <div>
            <label
              className="block text-sm font-semibold text-slate-700"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              className="mt-2 block min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 motion-reduce:transition-none"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between gap-4">
              <label
                className="block text-sm font-semibold text-slate-700"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <input
              className="mt-2 block min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 motion-reduce:transition-none"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm leading-5 text-red-800"
            >
              {error}
            </p>
          )}

          <button
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-emerald-800 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;

/*
function Login({setIsLoggedIn}) {
    const [email, setEmail] = useState("");
    const navigate = useNavigate(); 
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");

    const handleSubmit = async (e)=> {
        e.preventDefault();

        setIsLoading(true);
        try{
            const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

            const response =await fetch(`${BASE_URL}/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,})
            })

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                console.log("login successful");
                toast.success("login successful");
                setIsLoggedIn(true);
                navigate("/home"); // navigate to home page after successful login
            } else {
                console.error("login failed:", data);
                toast.error("Login failed. Please check your credentials and try again.");
            };    
        } catch (error) {
            console.error("An error occurred during login:", error);
            toast.error("An error occurred. Please try again.");    } 
        finally {
            setIsLoading(false);
        }   
    }

    return (
        <div className="grid min-h-[100dvh] place-items-center px-4 py-6 sm:py-10">
   
            <div className="grid w-full max-w-md rounded-lg bg-green-100 p-4 sm:p-6 md:p-8">
                
                <form onSubmit={handleSubmit}>
                    <label className="text-justify " htmlFor="email">Email</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="your email" />
                    <br />
                    <label className="text-left  " htmlFor="password">Password</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="your password" />
                    <br />
                    <button className="mt-2 w-full rounded-md bg-green-500 p-2 text-white sm:w-auto" type="submit" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <Link to="/signup"> 
                    <button className="mt-3 text-sm sm:text-base">Don't have an account? Sign up</button>
                </Link>
            </div>
        </div>
    )
}

export default Login
*/