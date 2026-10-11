import React, { useState } from "react";
import { Link } from "react-router-dom";
import { activeBackend, requestPasswordReset } from "./backend";
import {
  InlineError,
  inputClass,
  labelClass,
  primaryButtonClass,
} from "./FormLayout";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      await requestPasswordReset(email);
      setMessage(
        "If an account exists for this email, a password-reset link has been sent."
      );
    } catch (requestError) {
      setError(
        requestError?.message ||
          "Unable to send the password-reset email. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-[100dvh] place-items-center bg-slate-50 px-4 py-10 sm:px-6">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold capitalize text-emerald-800">
          {activeBackend} authentication
        </span>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
          Reset your password
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Enter the email address connected to your LogTracker account. We will
          send you a secure link for choosing a new password.
        </p>

        <form className="mt-8" onSubmit={handleSubmit}>
          <label className={labelClass} htmlFor="resetEmail">
            Email address
          </label>
          <input
            className={inputClass}
            id="resetEmail"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            inputMode="email"
            placeholder="name@example.com"
            required
          />

          {message && (
            <p
              className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900"
              role="status"
            >
              {message}
            </p>
          )}

          <InlineError>{error}</InlineError>

          <button
            className={`${primaryButtonClass} mt-6 !w-full`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending link…" : "Send reset link"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Remembered your password?{" "}
          <Link
            className="font-bold text-emerald-800 underline-offset-4 hover:underline"
            to="/login"
          >
            Return to sign in
          </Link>
        </p>
      </section>
    </main>
  );
}

export default ForgotPassword;
