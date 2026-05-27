import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function FarmActivity ({ isLoggedIn, setIsLoggedIn }) {
    const [farmSize, setFarmSize] = useState("");
    const [crop, setCrop] = useState("");
    const [plantGrowthStage, setPlantGrowthStage] = useState("");
    const [conditionOfIrrigationSystem, setConditionOfIrrigationSystem] = useState("");
    const [pestObservations, setPestObservations] = useState("");
    const [pestControlMeasures, setPestControlMeasures] = useState("");
    const [activityType, setActivityType] = useState("");
    const [irrigating, setIrrigating] = useState("");
    const [description, setDescription] = useState("");
    const [fertilizerUsed, setFertilizerUsed] = useState("");
    const [crop_condition, setCropCondition] = useState("");
    const [location, setLocation] = useState("");


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
                crop_condition: crop_condition,
                farm_size: farmSize,
                crop: crop,
                location: location,
                plant_growth_stage: plantGrowthStage,
                condition_of_irrigation_system: conditionOfIrrigationSystem,
                pest_observations: pestObservations,
                pest_control_measures: pestControlMeasures,
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
                    <label className="block text-sm font-medium text-gray-700"htmlFor="location">Location</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} />

                    <label className="block text-sm font-medium text-gray-700" htmlFor="farm_size">Farm Size</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="number" placeholder="Enter farm size in acres" value={farmSize} onChange={(e) => setFarmSize(e.target.value)} />

                    <label className="block text-sm font-medium text-gray-700" htmlFor="crop">Crop</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" placeholder="Enter crop type" value={crop} onChange={(e) => setCrop(e.target.value)} />

                    <label className="block text-sm font-medium text-gray-700" htmlFor="plant_growth_stage">Plant Growth Stage</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="plant_growth_stage" id="" value={plantGrowthStage} onChange={(e) => setPlantGrowthStage(e.target.value)}>
                        <option value="">Select plant growth stage</option>
                        <option value="Seedling">Seedling</option>
                        <option value="Vegetative">Vegetative</option>
                        <option value="Flowering">Flowering</option>
                        <option value="Fruiting">Fruiting</option>
                    </select>



                    <label className="block text-sm font-medium text-gray-700" htmlFor="activityType">Activity Type</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" placeholder="Enter activity Type" value={activityType} onChange={(e) => setActivityType(e.target.value)} />
                    
                    
                    <label className="block text-sm font-medium text-gray-700" htmlFor="conditionofirrigation">Condition of Irrigation</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="conditionofirrigation" id="" value={conditionOfIrrigation} onChange={(e) => setConditionOfIrrigation(e.target.value)}>
                        <option value="">Select condition of irrigation</option>
                        <option value="Good">Good</option>
                        <option value="Leakages">Leakages</option>
                        <option value="Broken">Broken</option>
                    </select>

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
                    
                    <label className="block text-sm font-medium text-gray-700" htmlFor="PestObservations">Pest or Disease Observations</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="pestobserved" id="" value={pestObserved} onChange={(e) => setPestObserved(e.target.value)}>
                        <option value="">Select pest or disease observations</option>
                        <option value="None">None</option>
                        <option value="Aphids">Aphids</option>
                        <option value="Whiteflies">Whiteflies</option>
                        <option value="Spider mites">Spider mites</option>
                        <option value="Leaf miners">Leaf miners</option>
                        <option value="Thrips">Thrips</option>
                        <option value="Caterpillars">Caterpillars</option>
                        <option value="Powdery mildew">Powdery mildew</option>
                        <option value="Botrytis">Botrytis</option>
                        <option value="Root rot">Root rot</option>
                        <option value="Severe">Severe</option>
                        <option value="Other">Other</option>
                    </select>

                    <label className="block text-sm font-medium text-gray-700" htmlFor="PestControlMeasures">Pest Control Measures Taken</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="pestcontrolmeasures" id="" value={pestControlMeasures} onChange={(e) => setPestControlMeasures(e.target.value)}>
                        <option value="">Select pest control measures taken</option>
                        <option value="None">None</option>
                        <option value="Chemical pesticides">Chemical pesticides</option>
                        <option value="Biological control">Biological control</option>
                        <option value="Cultural practices">Cultural practices</option>
                        <option value="Other">Other</option>
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