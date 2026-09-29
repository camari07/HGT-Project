import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import React from "react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

function Layout({ isLoggedIn, setIsLoggedIn }) {
  return (
    <div className="flex min-h-dvh flex-col bg-slate-50 text-slate-900">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-md bg-white px-4 py-2 text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>

      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
}

export default Layout;
/*
function Layout ({children, isLoggedIn, setIsLoggedIn}) {
    return(
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <main className="flex-1">
                <Toaster position="top-right" reverseOrder={false}/>
                    {children}
            </main>
            <Footer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
    )
}

export default Layout;
*/