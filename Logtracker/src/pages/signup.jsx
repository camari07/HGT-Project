import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://127.0.0.1:8000/signup/", {
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
            console.log("Signup successful:", data);
            navigate("/login");
        } else {
            console.error("Signup failed:", data);
        }
    }

    return (
        <div>
            <div class="grid justify-items-center mt-15">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="Username">User Name</label>
                    <input class="hover:bg-gray-200 block" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
                    <label htmlFor="email">Email</label>
                    <input class="block" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                    <label htmlFor="password">Password</label>
                    <input class="block" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                    {/* <label htmlFor="confirm_password">Confirm Password</label> */}
                    {/* <input class="block" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" /> */}
                    <button type="submit">Sign Up</button>
                </form>
                <Link to="/login">
                    <button >Already have an account? Login</button>
                </Link>
            </div>
        </div>
    )
}

export default Signup