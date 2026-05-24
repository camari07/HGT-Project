import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="grid place-items-center h-screen">
            <div className="grid justify-items-center bg-green-100 p-10 rounded-lg">
                <h1>Welcome to Holland Greentech LogTracker</h1>
                <p>Track your farm activities, irrigation, and maintenance logs all in one place.</p>
                <Link to="/irrigation">
                    <button className="bg-green-500 p-2 text-white rounded-md mt-4">Go to Irrigation Logs</button>
                </Link>
            </div>
        </div>
    )
}
export default Home;