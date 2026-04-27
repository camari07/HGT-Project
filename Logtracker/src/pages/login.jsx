import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("successfully submitted");
    }

    const handleClick = () => {
        console.log("clicked");
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
                    <button class="cursor-pointer hover:bg-gray-200" onClick={handleClick}>Login</button>
                </form>
                <Link to="/signup"> 
                    <button>Don't have an account? Sign up</button>
                </Link>
            </div>
        </div>
    )
}

export default Login