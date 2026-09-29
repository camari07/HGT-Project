import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import images from "../assets/images.jpeg";
import ProfileButton from "./profilebutton";

const publicNavigation = [{ to: "/about", label: "About" }];
const privateNavigation = [{ to: "/home", label: "Home" }];

const getNavLinkClasses = ({ isActive }) =>
  [
    "inline-flex min-h-11 items-center rounded-lg px-3 py-2",
    "text-sm font-semibold transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-emerald-300 focus-visible:ring-offset-2",
    "focus-visible:ring-offset-slate-950 motion-reduce:transition-none",
    isActive
      ? "bg-emerald-400 text-slate-950 shadow-sm"
      : "text-slate-200 hover:bg-white/10 hover:text-white",
  ].join(" ");

function Header({ isLoggedIn, setIsLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navigationItems = [
    ...(isLoggedIn ? privateNavigation : []),
    ...publicNavigation,
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-300/20 bg-slate-950/95 text-white shadow-lg shadow-slate-950/10 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          to={isLoggedIn ? "/home" : "/"}
          className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          aria-label="Holland Greentech home"
        >
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-400 text-sm font-black tracking-tight text-slate-950 shadow-sm ring-1 ring-white/20"
          >
            <img
              src={images.logo}
              alt="Holland Greentech"
              className="h-6 w-6 object-contain"
            />
          </span>

          <span className="min-w-0">
            <span className="block truncate text-sm font-bold tracking-wide sm:text-base">
              Holland Greentech
            </span>
            <span className="hidden text-xs text-emerald-200/80 sm:block">
              Farm operations
            </span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={getNavLinkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center md:flex">
          {isLoggedIn ? (
            <ProfileButton
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              navigate={navigate}
            />
          ) : (
            <Link
              to="/login"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-emerald-300/40 px-4 py-2 text-sm font-semibold text-emerald-100 transition-colors hover:border-emerald-300 hover:bg-emerald-300 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none"
            >
              Sign in
            </Link>
          )}
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-primary-navigation"
          onClick={() => setMenuOpen((currentValue) => !currentValue)}
        >
          <span aria-hidden="true" className="flex w-5 flex-col">
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition duration-200 motion-reduce:transition-none ${
                menuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`mt-1 block h-0.5 w-5 rounded-full bg-current transition duration-200 motion-reduce:transition-none ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`mt-1 block h-0.5 w-5 rounded-full bg-current transition duration-200 motion-reduce:transition-none ${
                menuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-primary-navigation"
          className="border-t border-white/10 bg-slate-950 px-4 pb-5 pt-3 shadow-2xl md:hidden"
        >
          <nav
            aria-label="Mobile primary navigation"
            className="mx-auto flex max-w-7xl flex-col gap-1"
          >
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${getNavLinkClasses({ isActive })} w-full justify-start`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mt-3 border-t border-white/10 pt-4">
              {isLoggedIn ? (
                <ProfileButton
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  navigate={navigate}
                />
              ) : (
                <Link
                  to="/login"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-emerald-400 px-4 py-2 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none"
                >
                  Sign in
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;



/*
function Header({ isLoggedIn, setIsLoggedIn, navigate }) {
    return (
        <header className="sticky top-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center z-50">
            <nav>
                <ul className="flex space-x-6">
                    <li><Link to="/home" className="hover:text-green-400">Home</Link></li>
                    <li><Link to="/about" className="hover:text-green-400">About</Link></li>
                    <li><Link to="/contact" className="hover:text-green-400">Contact</Link></li>
                </ul>
            </nav>
            <div>
                {isLoggedIn && (
                    <ProfileButton
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        navigate={navigate}
                    />
                )}
            </div>
        </header>
    );
}

export default Header;
*/