import React from "react";
import { useState } from "react";

function FarmActivity ({ isLoggedIn, setIsLoggedIn }) {
    const [activityType, setActivityType] = useState("");
    const [irrigating, setIrrigating] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8000/api/farm/", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Token ${token}`,
            },
            body: JSON.stringify({
                activity_type: activityType,
                irrigating: irrigating,
                description: description
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Submitted successfully")
            setActivityType("")
            setIrrigating("")
            setDescription("");

        } else {
            console.log("failed to submit")
        }

    }

    return(
        <div>
            <div className="grid justify-items-center mt-20 w-full h-screen bg-green-100">
               
                <form onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="activityType">Activity Type</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" placeholder="Enter activity Type" value={activityType} onChange={(e) => setActivityType(e.target.value)} />
                    <label className="block text-sm font-medium text-gray-700" htmlFor="irrigating">Irrigating</label>
                    <input type="checkbox" name="Irrigating" id="Irrigating" checked={irrigating} onChange={(e) => setIrrigating(e.target.checked)} />
                    <label className="block text-sm font-medium text-gray-700" htmlFor="Description">Activity Description</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" name="Description" id="Description" placeholder="Enter description of activity" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button className="block cursor-pointer bg-green-500 text-white p-2 rounded-md mt-4 ml-18" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )

}

export default FarmActivity