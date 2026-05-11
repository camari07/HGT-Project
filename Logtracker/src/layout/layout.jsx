import Footer from "../components/footer";
import Header from "../components/header";
import React from "react";
import { useState } from "react";

function Layout ({children, isLoggedIn, setIsLoggedIn}) {
    return(
        <div>
            <Header isLoggedIn={isLoggedIn} />
            {children}
            <Footer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
    )
}

export default Layout;