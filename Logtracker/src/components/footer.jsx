import React from "react";
import { useNavigate, Link } from "react-router-dom";
import LogoutButton from "./logoutbutton";

function Footer({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-gray-800 text-white p-4 mt-10 md:sticky md:bottom-0">
            <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-6">
                <div className="rounded-lg text-gray-800">
                    {isLoggedIn && (
                        <LogoutButton
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            navigate={navigate}
                        />
                    )}
                </div>
                <div>
                    <ul className="flex space-x-4">
                        <li><Link to="/about">About Us</Link></li>
                        <li>Dane</li>
                        <li>Sane</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-700 max-h-1 text-center text-gray-500 text-xs">
                © {new Date().getFullYear()} Holland Greentech. All rights reserved.
            </div>
        </div>
    );
}

export default Footer;