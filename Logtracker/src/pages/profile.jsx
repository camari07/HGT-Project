import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

function ProfilePage() {
    const navigate = useNavigate();
    const [isloggedIn, setIsLoggedIn] = useState(false);

    return(
        <div>
            <h1>Profile Page</h1>
            <p>Welcome to your profile!</p>
        </div>
    )
}

export default ProfilePage