import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

        const response = await fetch(`${BASE_URL}/signup/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            })
        })

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            localStorage.setItem("token", data.token);
            console.log("Signup successful:", data);
            navigate("/");
        } else {
            console.error("Signup failed:", data);
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="grid justify-items-center bg-green-100 p-10 rounded-lg">
                <form onSubmit={handleSubmit}>
                    <h2>Sign Up to Holland Greentech LogTracker</h2>
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="Username">User Name</label>
                    <input className="w-full p-2 border border-gray-300 rounded-md" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="email">Email</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="password">Password</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                    {/* <label htmlFor="confirm_password">Confirm Password</label> */}
                    {/* <input class="block" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" /> */}
                    <button className="bg-green-500 p-2 text-white rounded-md" type="submit">Sign Up</button>
                </form>
                <Link to="/login">
                    <button>Already have an account? Login</button>
                </Link>
            </div>
        </div>
    )
}

export default Signup