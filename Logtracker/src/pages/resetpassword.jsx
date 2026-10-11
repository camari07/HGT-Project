import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { activeBackend, updatePassword } from "./backend";
import {
  InlineError,
  inputClass,
  labelClass,
  primaryButtonClass,
} from "./FormLayout";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await updatePassword({
        password,
        uid: searchParams.get("uid"),
        token: searchParams.get("token"),
      });

      toast.success("Password updated successfully");
      navigate("/login", { replace: true });
    } catch (requestError) {
      setError(
        requestError?.message ||
          "Unable to update your password. The recovery link may have expired."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-[100dvh] place-items-center bg-slate-50 px-4 py-10 sm:px-6">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        ;

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
          Choose a new password
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Use at least eight characters and choose a password you do not use
          elsewhere.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className={labelClass} htmlFor="newPassword">
              New password
            </label>
            <input
              className={inputClass}
              id="newPassword"
              name="newPassword"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="confirmNewPassword">
              Confirm new password
            </label>
            <input
              className={inputClass}
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <InlineError>{error}</InlineError>

          <button
            className={`${primaryButtonClass} !w-full`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating password…" : "Update password"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Need a new recovery link?{" "}
          <Link
            className="font-bold text-emerald-800 underline-offset-4 hover:underline"
            to="/forgot-password"
          >
            Request another
          </Link>
        </p>
      </section>
    </main>
  );
}

export default ResetPassword;
