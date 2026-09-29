
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { activeBackend, signUp } from "./backend";


import {
  InlineError,
  inputClass,
  labelClass,
  primaryButtonClass,
} from "./FormLayout";

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup({ setIsLoggedIn }) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const update = (key) => (event) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (values.password !== values.confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await signUp({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      if (result.requiresEmailConfirmation) {
        toast.success("Account created. Check your email to confirm it.");
        navigate("/login", { replace: true });
      } else {
        setIsLoggedIn?.(true);
        toast.success("Account created successfully");
        navigate("/home", { replace: true });
      }
    } catch (requestError) {
      setError(requestError?.message || "Unable to create your account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-7">
          
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
            Create your LogTracker account
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Set up one secure account for your farm records.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="firstName">First name</label>
              <input className={inputClass} id="firstName" value={values.firstName} onChange={update("firstName")} autoComplete="given-name" required />
            </div>
            <div>
              <label className={labelClass} htmlFor="lastName">Last name</label>
              <input className={inputClass} id="lastName" value={values.lastName} onChange={update("lastName")} autoComplete="family-name" required />
            </div>
            <div>
              <label className={labelClass} htmlFor="username">Username</label>
              <input className={inputClass} id="username" value={values.username} onChange={update("username")} autoComplete="username" required />
            </div>
            <div>
              <label className={labelClass} htmlFor="signupEmail">Email address</label>
              <input className={inputClass} id="signupEmail" type="email" value={values.email} onChange={update("email")} autoComplete="email" required />
            </div>
            <div>
              <label className={labelClass} htmlFor="newPassword">Password</label>
              <input className={inputClass} id="newPassword" type="password" value={values.password} onChange={update("password")} autoComplete="new-password" minLength={8} required />
            </div>
            <div>
              <label className={labelClass} htmlFor="confirmPassword">Confirm password</label>
              <input className={inputClass} id="confirmPassword" type="password" value={values.confirmPassword} onChange={update("confirmPassword")} autoComplete="new-password" minLength={8} required />
            </div>
          </div>

          <InlineError>{error}</InlineError>

          <button className={`${primaryButtonClass} mt-7 !w-full`} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link className="font-bold text-emerald-800 underline-offset-4 hover:underline" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;


/*
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

        const response = await fetch(`${BASE_URL}/signup/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: firstname,
                last_name: lastname,
                username: username,
                email: email,
                password: password,
            })
        })

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            localStorage.setItem("token", data.token);
            console.log("Signup successful:", data);
            navigate("/home");
        } else {
            console.error("Signup failed:", data);
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="grid justify-items-center bg-green-100 p-10 rounded-lg">
                <form onSubmit={handleSubmit}>
                    <h2>Sign Up to Holland Greentech LogTracker</h2>
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="firstname">First Name</label>
                    <input className="w-full p-2 border border-gray-300 rounded-md" value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" placeholder="First Name" />
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="lastname">Last Name</label>
                    <input className="w-full p-2 border border-gray-300 rounded-md" value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" placeholder="Last Name" />
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="Username">User Name</label>
                    <input className="w-full p-2 border border-gray-300 rounded-md" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="email">Email</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="password">Password</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                   
                    {/* <input class="block" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" /> */
                    /*
                    <button className=" bg-green-500 p-2 mt-2 text-white rounded-md" type="submit">Sign Up</button>
                </form>
                <Link to="/home">
                    <button >Already have an account? Login</button>
                </Link>
            </div>
        </div>
    )
}

export default Signup
*/