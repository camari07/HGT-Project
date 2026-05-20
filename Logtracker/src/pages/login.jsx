import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Login({setIsLoggedIn}) {
    const [email, setEmail] = useState("");
    const navigate = useNavigate(); // for navigation after successful login
    const [password, setPassword] = useState("");

    const handleSubmit = async (e)=> {
        e.preventDefault();

        const BASE_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:8000";

        const response =await fetch(`${BASE_URL}/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,})
        })

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            console.log("login successful");
            setIsLoggedIn(true);
            navigate("/home"); // navigate to home page after successful login
        } else {
            console.error("login failed:", data);
        };    
    }

    return (
        <div className="grid place-items-center flex-1 h-screen">
   
            <div className="grid bg-green-100 p-10 rounded-lg">
                
                <form onSubmit={handleSubmit}>
                    <label className="text-justify " htmlFor="email">Email</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="your email" />
                    <br />
                    <label className="text-left  " htmlFor="password">Password</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="your password" />
                    <br />
                    <button className=" bg-green-500 p-2 text-white rounded-md" type="submit">Login</button>
                </form>
                <Link to="/signup"> 
                    <button className="">Don't have an account? Sign up</button>
                </Link>
            </div>
        </div>
    )
}

export default Login