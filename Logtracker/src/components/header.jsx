import React from "react";
import { Link } from "react-router-dom";
import ProfileButton from "./profilebutton";

function Header({ isloggedIn, setIsLoggedIn, navigate }) {
    return (
        <header className="fixed top-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center z-50">
            <nav>
                <ul className="flex space-x-6">
                    <li><Link to="/" className="hover:text-green-400">Home</Link></li>
                    <li><Link to="/about" className="hover:text-green-400">About</Link></li>
                    <li><Link to="/contact" className="hover:text-green-400">Contact</Link></li>
                </ul>
            </nav>
            <div>
                {isloggedIn && (
                    <ProfileButton
                        isloggedIn={isloggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        navigate={navigate}
                    />
                )}
            </div>
        </header>
    );
}

export default Header;