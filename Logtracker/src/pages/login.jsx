import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate(); // for navigation after successful login
    const [password, setPassword] = useState("");

    const handleSubmit = async (e)=> {
        e.preventDefault();

        const response =await fetch("http://127.0.0.1:8000/login/", {
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
            console.log("login successful");
            setIsLoggedIn(true)
            navigate("/"); // navigate to home page after successful login
        } else {
            console.error("login failed:", data);
        };    
    }

    return (
        <div>
            <div class="grid justify-items-center mt-15">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input class="block" value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="your email" />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input class="block" value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="your password" />
                    <br />
                    <button class="cursor-pointer hover:bg-gray-200" type="submit">Login</button>
                </form>
                <Link to="/signup"> 
                    <button>Don't have an account? Sign up</button>
                </Link>
            </div>
        </div>
    )
}

export default Login