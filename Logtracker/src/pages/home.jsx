import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import irrigationImg from "../assets/irrigate.jpg";
import farmImg from "../assets/farming.jpg";
import maintenanceImg from "../assets/farmact.jpeg";
import images from "../assets/images.jpeg";

const activities = [
  {
    title: "Irrigation activity",
    description: "Record water use, the water source, filtering, and leakage.",
    actionLabel: "Go to irrigation",
    to: "/irrigation",
    image: irrigationImg,
    alt: "Irrigation equipment watering a cultivated field",
    buttonStyle: "bg-emerald-700 text-white hover:bg-emerald-800",
  },
  {
    title: "Record farm activity",
    description: "Add crop, labour, and other operational work to the farm record.",
    actionLabel: "Go to activities",
    to: "/farm",
    image: farmImg,
    alt: "A farmer working among cultivated crop rows",
    buttonStyle: "bg-emerald-700 text-white hover:bg-emerald-800",
  },
  {
    title: "Maintenance activity",
    description: "Log equipment and infrastructure maintenance for the farm.",
    actionLabel: "Go to maintenance",
    to: "/maintenance",
    image: maintenanceImg,
    alt: "Farm equipment being inspected for maintenance",
    buttonStyle: "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
  },
  {
    title: "Report a problem",
    description: "Record an equipment or operational issue that needs attention.",
    actionLabel: "Report a problem",
    // Change this to /report-problem after adding a dedicated report page.
    to: "/maintenance",
    image: maintenanceImg,
    alt: "A farm worker inspecting an operational issue",
    buttonStyle: "bg-emerald-700 text-white hover:bg-emerald-800",
  },
];

function Home() {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          {/* 
          <img
            className="h-14 w-14 shrink-0 rounded-xl border border-slate-200 bg-white object-contain p-1 sm:h-20 sm:w-20"
            src={logoImg}
            alt="Holland Greentech"
          />
            */}
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Farm operations
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Welcome to your dashboard
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Choose an activity to continue.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => (
            <article
              key={activity.title}
              className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md motion-reduce:transition-none"
            >
              <img
                className="aspect-[4/3] w-full object-cover"
                src={activity.image}
                alt={activity.alt}
              />

              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold tracking-tight text-slate-950">
                  {activity.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {activity.description}
                </p>

                <Link
                  to={activity.to}
                  className={`mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg px-4 py-2 text-center text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 motion-reduce:transition-none ${activity.buttonStyle}`}
                >
                  {activity.actionLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;

/*
function Home() {
        return(
         <div className="px-4 py-4 sm:px-6 md:pb-10">  
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
                
                <img className="h-14 w-14 object-contain sm:h-20 sm:w-20 md:h-24 md:w-24" src={images} alt="hgt_logo" />
                <h2 className="px-4 py-2 text-center text-lg sm:text-left sm:text-xl">Select an Activity to Record</h2>
            </div>
            <div className="mt-2 flex flex-col gap-4 bg-white sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6
            lg:flex-nowrap lg:justify-between">
                
                <div className="flex basis-full flex-col items-center sm:basis-[45%] lg:basis-1/4">

                        <img className="h-32 w-auto max-w-full rounded-xl object-contain sm:h-40 md:h-44" src={irrigationImg} alt="Irrigation" />
                        <Link className="md:mb-100" to="/irrigation">
                            <button className="mt-1 w-full max-w-[220px] rounded bg-blue-500 px-4 py-2 text-center text-white
                            hover:bg-blue-700 sm:max-w-[160px]">Irrigation Activity</button>
                        </Link>
        
                </div>
                <div className="flex basis-full flex-col items-center sm:basis-[45%] lg:basis-1/4">
                        <img className="h-32 w-auto max-w-full rounded-xl object-contain sm:h-40 md:h-44" src={farmImg} alt="maize farm" />
                        <Link className="md:mb-100" to="/farm">
                            <button className="mt-1 w-full max-w-[220px] rounded bg-blue-500 px-4 py-2 text-center text-white
                            hover:bg-blue-700 sm:max-w-[160px]">Record Farm Activity</button>
                        </Link>
                </div>
                <div className="flex basis-full flex-col items-center sm:basis-[45%] lg:basis-1/4">
                        <img className="h-32 w-auto max-w-full rounded-xl object-contain sm:h-40 md:h-44" src={maintenanceImg} alt="farm maintenance" />
                        <Link className="md:mb-100" to="/maintenance">
                            <button className="mt-1 w-full max-w-[220px] rounded bg-blue-500 px-4 py-2 text-center text-white
                            hover:bg-blue-700 sm:max-w-[160px]">Maintenance Activity</button>
                        </Link>
                </div>
                <div className="flex basis-full flex-col items-center sm:basis-[45%] lg:basis-1/4"> 
                        <img className="h-32 w-auto max-w-full rounded-xl object-contain sm:h-40 md:h-44" src="https://picsum.photos/536/354" alt="lorem ipsum" />
                        <Link className="md:mb-100" to="/report">
                            <button className="mt-1 w-full max-w-[220px] rounded bg-blue-500 px-4 py-2 text-center text-white
                            hover:bg-blue-700 sm:max-w-[160px]">Report a problem</button>
                        </Link>
                </div>

            </div>
        </div> 
)}
export default Home; 
*/