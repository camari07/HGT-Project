import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


function Login({setIsLoggedIn}) {
    const [email, setEmail] = useState("");
    const navigate = useNavigate(); 
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");

    const handleSubmit = async (e)=> {
        e.preventDefault();

        setIsLoading(true);
        try{
            const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
                toast.success("login successful");
                setIsLoggedIn(true);
                navigate("/home"); // navigate to home page after successful login
            } else {
                console.error("login failed:", data);
                toast.error("Login failed. Please check your credentials and try again.");
            };    
        } catch (error) {
            console.error("An error occurred during login:", error);
            toast.error("An error occurred. Please try again.");    } 
        finally {
            setIsLoading(false);
        }   
    }

    return (
        <div className="grid min-h-[100dvh] place-items-center px-4 py-6 sm:py-10">
   
            <div className="grid w-full max-w-md rounded-lg bg-green-100 p-4 sm:p-6 md:p-8">
                
                <form onSubmit={handleSubmit}>
                    <label className="text-justify " htmlFor="email">Email</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="your email" />
                    <br />
                    <label className="text-left  " htmlFor="password">Password</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="your password" />
                    <br />
                    <button className="mt-2 w-full rounded-md bg-green-500 p-2 text-white sm:w-auto" type="submit" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <Link to="/signup"> 
                    <button className="mt-3 text-sm sm:text-base">Don't have an account? Sign up</button>
                </Link>
            </div>
        </div>
    )
}

export default Login