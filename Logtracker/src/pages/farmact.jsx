import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function FarmActivity ({ isLoggedIn, setIsLoggedIn }) {
    const [activityType, setActivityType] = useState("");
    const [irrigating, setIrrigating] = useState("");
    const [description, setDescription] = useState("");
    const [fertilizerUsed, setFertilizerUsed] = useState("");
    const [crop_condition, setCropCondition] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

        const response = await fetch(`${BASE_URL}/api/farm/`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Token ${token}`,
            },
            body: JSON.stringify({
                activity_type: activityType,
                irrigating: irrigating,
                description: description,
                fertilizer_used: fertilizerUsed,
                crop_condition: crop_condition
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Submitted successfully");
            toast.success("Farm activity log submitted successfully!");
            setActivityType("");
            setIrrigating("");
            setDescription("");
            setFertilizerUsed("");
            setCropCondition("");

        } else {
            console.log("failed to submit")
        }

    }

    return(
        <div className="min-h-[100dvh] bg-green-100 px-4 py-6 sm:py-10">
            <div className="mx-auto w-full max-w-lg">
               
                <form onSubmit={handleSubmit} className="w-full">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="activityType">Activity Type</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" placeholder="Enter activity Type" value={activityType} onChange={(e) => setActivityType(e.target.value)} />
                    <label className="block text-sm font-medium text-gray-700" htmlFor="irrigating">Irrigating</label>
                    <input type="checkbox" name="Irrigating" id="Irrigating" checked={irrigating} onChange={(e) => setIrrigating(e.target.checked)} />
                    <label className="block text-sm font-medium text-gray-700" htmlFor="Description">Activity Description</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" name="Description" id="Description" placeholder="Enter description of activity" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <label className="block text-sm font-medium text-gray-700" htmlFor="Fertilizer">Fertilizer</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" name="Fertilizer" id="Fertilizer" placeholder="Enter fertilizer used (if any)" value={fertilizerUsed} onChange={(e) => setFertilizerUsed(e.target.value)} />
                    <label className="block text-sm font-medium text-gray-700" htmlFor="CropCondition">Crop Condition</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="crop" id="" value={crop_condition} onChange={(e) => setCropCondition(e.target.value)}>
                        <option value="">Select crop condition</option>
                        <option value="Healthy">Healthy</option>
                        <option value="Slightly yellowing">Slightly yellowing</option>
                        <option value="Wilting">Wilting</option>
                        <option value="Pest presence">Pest presence</option>
                        <option value="Spots on leaves">Spots on leaves</option>
                    </select>
                    
                    <div className="mt-4 flex flex-col gap-1 sm-flex-row">
                        <button className="cursor-pointer w-full rounded-md bg-green-500 p-2 text-white sm:w-auto" type="submit">Submit</button>
                    
                        <Link to="/home"> 
                            <button className="w-full rounded-md bg-gray-500 p-2 text-white">Go Back</button>
                        </Link> 
                    </div>               
                </form>
            </div>
        </div>
    )

}

export default FarmActivity