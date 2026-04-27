import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home () {
    return(
        <div class="flex justify-between items-center mt-10 bg-green-100 h-150 p-5">
            <div class="mr-5">

                    <img src="https://picsum.photos/536/354" alt="lorem ipsum" />
                    <Link to="/irrigation">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mt-2 rounded">Record Irrigation Activity</button>
                    </Link>
      
            </div>
            <div class="mr-5">
                    <img src="https://picsum.photos/536/354" alt="lorem ipsum" />
                    <h3>Record irrigation activity</h3>
            </div>
            <div class="mr-5">
                    <img src="https://picsum.photos/536/354" alt="lorem ipsum" />
                    <h3>Record irrigation activity</h3>
            </div>
            <div class="mr-5">
                    <img src="https://picsum.photos/536/354" alt="lorem ipsum" />
                    <h3>Record irrigation activity</h3>
            </div>

        </div>
    )
}; 

export default Home 