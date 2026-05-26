import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import irrigationImg from "../assets/irrigate.jpg";
import farmImg from "../assets/farming.jpg";
import maintenanceImg from "../assets/farmact.jpeg";
import images from "../assets/images.jpeg";

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
                        <Link className="md:mb-100" to="/maintenance">
                            <button className="mt-1 w-full max-w-[220px] rounded bg-blue-500 px-4 py-2 text-center text-white
                            hover:bg-blue-700 sm:max-w-[160px]">Report a problem</button>
                        </Link>
                </div>

            </div>
        </div> 
)}
export default Home;