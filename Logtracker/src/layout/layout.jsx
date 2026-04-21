import Footer from "../components/footer";
import Header from "../components/header";
import React from "react";
import { useState } from "react";

function Layout ({children}) {
    return(
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout;