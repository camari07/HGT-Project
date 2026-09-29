import React from "react";
import { Link } from "react-router-dom";
import { secondaryButtonClass } from "./FormLayout";

function About() {
    return (
        <main className="min-h-[100dvh] bg-slate-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto w-full max-w-5xl">
                <section className="overflow-hidden rounded-3xl bg-emerald-950 px-5 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                        About LogTracker
                    </p>
                    <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                        Farm records designed for clearer, faster decisions.
                    </h1>
                    <p className="mt-6 max-w-3xl text-base leading-7 text-emerald-100 sm:text-lg sm:leading-8">
                        LogTracker helps farmers capture daily field work, irrigation,
                        crop conditions and equipment maintenance in one dependable place.
                        The goal is simple: make farm information easier to record and more
                        useful when planning the next action.
                    </p>
                </section>

                <section className="grid gap-8 py-10 sm:py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                            What it supports
                        </p>
                        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                            From field observation to reliable farm history
                        </h2>
                    </div>

                    <ul className="divide-y divide-slate-200 border-y border-slate-200">
                        <li className="py-5">
                            <h3 className="font-bold text-slate-950">Daily farm activities</h3>
                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                Record field work, fertilizer application and crop-management actions.
                            </p>
                        </li>
                        <li className="py-5">
                            <h3 className="font-bold text-slate-950">Irrigation records</h3>
                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                Track water source, method, duration, volume and system condition.
                            </p>
                        </li>
                        <li className="py-5">
                            <h3 className="font-bold text-slate-950">Crop-health observations</h3>
                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                Keep a history of growth stages, pest pressure and control measures.
                            </p>
                        </li>
                        <li className="py-5">
                            <h3 className="font-bold text-slate-950">Maintenance and support</h3>
                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                Report problems and capture equipment service or repair requirements.
                            </p>
                        </li>
                    </ul>
                </section>

                <section className="border-t border-slate-200 py-8 sm:flex sm:items-center sm:justify-between sm:gap-8">
                    <div>
                        <h2 className="text-xl font-bold text-slate-950">Ready to record today’s work?</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Return to the dashboard and select the activity you want to capture.
                        </p>
                    </div>
                    <Link className={`${secondaryButtonClass} mt-5 sm:mt-0`} to="/home">
                        Back to home
                    </Link>
                </section>
            </div>
        </main>
    );
}

export default About;
