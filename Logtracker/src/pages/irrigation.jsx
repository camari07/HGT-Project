import React from "react";
import { useState } from "react";

function Irrigation () {
    return(
        <div>
            <p>irrigation page</p>
            <form>
                <label htmlFor="farmsize">Farm Size</label>
                <input type="text" id="farmsize" placeholder="Farm Size" />
                <label htmlFor="irrigation">Irrigation</label>
                <input type="text" id="irrigation" placeholder="Irrigation" />
            </form>
        </div>  
        
    ); 
}; 

export default Irrigation