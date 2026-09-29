import React from "react";
import { useNavigate, Link } from "react-router-dom";
import LogoutButton from "./logoutbutton";

function Footer({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  return (
    <footer className="mt-auto border-t border-slate-700 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="text-center text-sm text-slate-300 sm:text-left">
          © {new Date().getFullYear()} Holland Greentech. All rights reserved.
        </p>

        {isLoggedIn && (
          <div className="w-full sm:w-auto">
            <LogoutButton
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              navigate={navigate}
            />
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;

/*
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

            <div className="mt-4 border-t border-gray-700 pt-3 max-h-1 text-center text-gray-500 text-xs">
                © {new Date().getFullYear()} Holland Greentech. All rights reserved.
            </div>
        </div>
    );
}

export default Footer;
*/