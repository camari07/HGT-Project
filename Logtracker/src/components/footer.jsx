import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./logoutbutton";


function Footer ({ isLoggedIn, setIsLoggedIn}) {
    const navigate = useNavigate();
    
    return(
        <div className="bg-gray-800 text-white p-4 fixed bottom-0 w-full">
            <p>Footer</p>
            {isLoggedIn && <LogoutButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} navigate={navigate} />}
        </div>
       
    )
}; 

export default Footer