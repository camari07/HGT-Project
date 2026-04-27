import React from "react";
import { useState } from "react";

function Header () {
    

    return(
        <div class="fixed top-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
            <div class="flex space-x-4">
                <li class="flex hover:text-blue-500">Home</li>
                <li class="flex hover:text-blue-500">About</li>
                <li class="flex hover:text-blue-500">Contact</li>
            </div>
            
        </div>
    )
}; 

export default Header