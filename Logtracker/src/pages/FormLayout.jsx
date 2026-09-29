import React from "react";
import { Link } from "react-router-dom";
import { activeBackend } from "./backend";

export const inputClass =
  "mt-2 block min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100 motion-reduce:transition-none";

export const labelClass = "block text-sm font-semibold text-slate-700";

export const primaryButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto motion-reduce:transition-none";

export const secondaryButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:w-auto motion-reduce:transition-none";

export function FormPage({ eyebrow, title, description, children }) {
  return (
    <main className="min-h-[100dvh] bg-slate-50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-6 border-b border-slate-200 pb-5 sm:mb-8 sm:flex sm:items-end sm:justify-between sm:gap-6">
          <div>
          
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {description}
            </p>
          </div>
          
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-7 lg:p-8">
          {children}
        </section>
      </div>
    </main>
  );
}

export function FormSection({ title, description, children }) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="text-base font-bold text-slate-950">{title}</legend>
      {description && (
        <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
      )}
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {children}
      </div>
    </fieldset>
  );
}

export function FormActions({ isSubmitting, submitLabel, whatsappHref }) {
  return (
    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:flex-wrap sm:items-center">
      <Link className={secondaryButtonClass} to="/home">
        Back to home
      </Link>
      {whatsappHref && (
        <a
          className={secondaryButtonClass}
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          Send photo on WhatsApp
        </a>
      )}
      <button className={primaryButtonClass} disabled={isSubmitting} type="submit">
        {isSubmitting ? "Saving…" : submitLabel}
      </button>
    </div>
  );
}

export function InlineError({ children }) {
  if (!children) return null;
  return (
    <p
      role="alert"
      className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
    >
      {children}
    </p>
  );
}
