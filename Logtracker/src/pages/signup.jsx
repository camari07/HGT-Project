import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("successfully submitted");
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
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input class="block" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" />
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