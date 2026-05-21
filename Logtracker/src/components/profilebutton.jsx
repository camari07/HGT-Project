import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch(`${import.meta.env.VITE_API_URL}/profile/`, {
            headers: {
                "Authorization": `Token ${token}`,
            }
        })
        .then(res => res.json())
        .then(data => setUsername(data.username))
        .catch(err => console.error("Failed to fetch profile:", err));
    }, []);

    return (
        <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-1.5 px-4 rounded-full text-sm font-medium transition"
        >
            <div className="w-6 h-6 bg-white text-green-700 rounded-full flex items-center justify-center font-bold text-xs">
                {username ? username[0].toUpperCase() : "?"}
            </div>
            {username || "Profile"}
        </button>
    );
}

export default ProfileButton;