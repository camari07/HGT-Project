import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

function ProfileButton (isloggedIn, setIsLoggedIn) {
    const navigate = useNavigate();

    return(
        <button onClick={() => navigate("/profile")} class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Profile
        </button>
    )
}; 

export default ProfileButton