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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="your email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="your password" />
                <button type="submit">Login</button>
            </form>
            <Link to="/signup"> 
                <button>Don't have an account? Sign up</button>
            </Link>
        </div>
    )
}

export default Login