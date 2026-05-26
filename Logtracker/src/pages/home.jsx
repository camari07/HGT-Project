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
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
                
                <img className="h-16 w-16 object-contain sm:h-20 sm:w-20 md:h-24 md:w-24" src={images} alt="hgt_logo" />
                <h2 className="px-4 py-2 text-center text-lg sm:text-left sm:text-xl">Welcome to the Home Page</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-between mt-10 bg-white h-150">
                
                <div className="md:mr-5 md:w-1/4 flex flex-col items-center md:justify-between">

                        <img className="ml-4 mt-0 md:mt-2 max-h-30 md:max-h-auto rounded object-contain " src={irrigationImg} alt="lorem ipsum" />
                        <Link className="md:mb-100" to="/irrigation">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white ml-4 mt-2 rounded w-40">Irrigation Activity</button>
                        </Link>
        
                </div>
                <div className="md:mr-5 mt-2 md:w-1/4 flex flex-col items-center md:justify-between">
                        <img className="ml-4 max-h-30 md:max-h-auto object-contain " src={farmImg} alt="lorem ipsum" />
                        <Link className="md:mb-100" to="/farm">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white ml-4 mt-2 rounded w-40">Record Farm Activity</button>
                        </Link>
                </div>
                <div className="md:mr-5 md:w-1/4 flex flex-col items-center md:justify-between">
                        <img className="ml-4 mt-2 max-h-30 md:max-h-auto object-contain " src={maintenanceImg} alt="lorem ipsum" />
                        <Link className="md:mb-100" to="/maintenance">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white ml-4 mt-2 rounded w-40">Maintenance Activity</button>
                        </Link>
                </div>
                <div className="md:mr-5 md:w-1/4 flex flex-col items-center md:justify-between"> 
                        <img className="ml-4 mt-2 max-h-30 md:max-h-auto object-contain " src="https://picsum.photos/536/354" alt="lorem ipsum" />
                        <Link className="md:mb-100" to="/maintenance">
                            <button className="bg-green-500 hover:bg-green-700 text-white ml-4 mt-2 rounded w-40">Report a problem</button>
                        </Link>
                </div>

            </div>
        </div> 
)}
export default Home;