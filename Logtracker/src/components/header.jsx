import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileButton from "./profilebutton";

function Header ({isloggedIn, setIsLoggedIn, navigate}) {
    const onclick = () => {
        if (isloggedIn) {
            navigate("/irrigation");
        }
    };

    return(
        <header class="fixed top-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
            <nav>
                <ul class="flex space-x-4">
                    <li className="flex hover:text-blue-500">Home</li>
                    <li class="flex hover:text-blue-500">About</li>
                    <li class="flex hover:text-blue-500">Contact</li>

                

                </ul>
            </nav>
            <div>
                {isloggedIn && <ProfileButton isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn} navigate={navigate} />}
            </div>
            
        </header>
    )
}; 

export default Header