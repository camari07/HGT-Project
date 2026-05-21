import React from "react";
import { useNavigate, Link } from "react-router-dom";
import LogoutButton from "./logoutbutton";

function Footer({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-800 text-white p-6 mt-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                {/* Branding */}
                <div>
                    <h2 className="text-green-400 font-bold text-lg">Holland Greentech</h2>
                    <p className="text-gray-400 text-sm mt-1">Farm activity tracking made simple.</p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-2 text-sm">
                    <p className="text-gray-400 font-semibold uppercase text-xs mb-1">Quick Links</p>
                    <Link to="/" className="text-gray-300 hover:text-green-400">Home</Link>
                    <Link to="/irrigation" className="text-gray-300 hover:text-green-400">Irrigation</Link>
                    <Link to="/farm" className="text-gray-300 hover:text-green-400">Farm Activity</Link>
                    <Link to="/maintenance" className="text-gray-300 hover:text-green-400">Maintenance</Link>
                </div>

                {/* Logout */}
                <div>
                    {isLoggedIn && (
                        <LogoutButton
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            navigate={navigate}
                        />
                    )}
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-xs">
                © {new Date().getFullYear()} Holland Greentech. All rights reserved.
            </div>
        </div>
    );
}

export default Footer;