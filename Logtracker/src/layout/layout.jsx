import Footer from "../components/footer";
import Header from "../components/header";
import React from "react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

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