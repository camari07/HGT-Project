import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

function LogoutButton ({setIsLoggedIn}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return(
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
            Logout
        </button>
    )
}

export default LogoutButton