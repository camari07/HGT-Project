import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Irrigation ({ isLoggedIn, setIsLoggedIn }) {
    const [fieldName, setFieldName] = useState("");
    const [location, setLocation] = useState("Unknown");
    const [farmSize, setFarmSize] = useState("");
    const [cropType, setCropType] = useState("Unknown");
    const [plantGrowthStage, setPlantGrowthStage] = useState("Unknown");
    const [irrigationMethod, setIrrigationMethod] = useState("Unknown");
    const [irrigationDuration, setIrrigationDuration] = useState("");
    const [waterAmount, setWaterAmount] = useState("");
    const [waterSource, setWaterSource] = useState("Unknown");
    const [pumpUsed, setPumpUsed] = useState(false);
    const [fertilizerUsed, setFertilizerUsed] = useState("None");
    const [filterType, setFilterType] = useState("None");
    const [soilType, setSoilType] = useState("Unknown");
    const [weatherConditions, setWeatherConditions] = useState("Unknown");
    const [leakage, setLeakage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
        
        const response = await fetch(`${BASE_URL}/api/irrigation/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify({
                field_name: fieldName,
                water_amount: waterAmount,
                water_source: waterSource,
                pump_used: pumpUsed,
                filter_type: filterType,
                leakage: leakage,
                location: location,
                farm_size: farmSize,
                crop_type: cropType,
                plant_growth_stage: plantGrowthStage,
                irrigation_method: irrigationMethod,
                irrigation_duration: irrigationDuration,
                soil_type: soilType,
                weather_conditions: weatherConditions
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log("Irrigation log submitted successfully:", data);
            toast.success("Irrigation log submitted successfully!");
            setFieldName("");
            setWaterAmount("");
            setWaterSource("Unknown");
            setPumpUsed(false);
            setFilterType("None");
            setLeakage(false);
            setCropType("Unknown");
            setLocation("Unknown");
            setFarmSize("");
            setPlantGrowthStage("Unknown");
            setIrrigationMethod("Unknown");
            setIrrigationDuration("");
            setSoilType("Unknown");
            setWeatherConditions("Unknown");
        } else {
            console.error("Failed to submit irrigation log:", data);
            toast.error("Failed to submit irrigation log. Please try again.");
        }
        
    }

    return(
        <div className="min-h-[100dvh] bg-green-100 px-4 py-6 sm:py-10">
            
       
            <div className="mx-auto w-full max-w-lg">
                <form action="" onSubmit={handleSubmit} className="w-full">
                    <h2>INPUT YOUR IRRIGATION DATA HERE</h2>
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="fieldname">Field Name</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" id="fieldname" placeholder="Field name" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />

                    <label htmlFor="location">Location</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" id="location" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    
                    <label htmlFor="farmsize">Farm Size (acres)</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="number" id="farmsize" placeholder="Farm size in acres" value={farmSize} onChange={(e) => setFarmSize(e.target.value)} />
                    
                    <label htmlFor="croptype">Crop Type</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" id="croptype" placeholder="Crop type" value={cropType} onChange={(e) => setCropType(e.target.value)} />
                    
                    <label htmlFor="plantgrowthstage">Plant Growth Stage</label>
                    <select name="plantgrowthstage" id="plantgrowthstage" value={plantGrowthStage} onChange={(e) => setPlantGrowthStage(e.target.value)}>
                        <option value="Seedling">Seedling</option>
                        <option value="Vegetative">Vegetative</option>
                        <option value="Flowering">Flowering</option>
                        <option value="Fruiting">Fruiting</option>
                    </select>

                    <label htmlFor="irrigationmethod">Irrigation Method</label>
                    <select name="irrigationmethod" id="irrigationmethod" value={irrigationMethod} onChange={(e) => setIrrigationMethod(e.target.value)}>
                        <option value="Drip">Drip</option>
                        <option value="Sprinkler">Sprinkler</option>
                        <option value="Flood">Flood</option>
                    </select>

                    <label htmlFor="irrigationduration">Irrigation Duration (hours)</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="number" id="irrigationduration" placeholder="Irrigation duration in hours" value={irrigationDuration} onChange={(e) => setIrrigationDuration(e.target.value)} />



                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="wateramount">Water Amount (liters)</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="number" id="wateramount" placeholder="Water amount in liters" value={waterAmount} onChange={(e) => setWaterAmount(e.target.value)} />
                    
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="water_source">Water Source</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="water_source" id="water_source" value={waterSource} onChange={(e) => setWaterSource(e.target.value)}>
                        <option value="Unknown">Unknown</option>
                        <option value="Well">Well</option>
                        <option value="Borehole">Borehole</option>
                        <option value="Reservoir">Reservoir</option>
                        <option value="River">River</option>
                    </select>
                   
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="filter_type">Filter Type</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="filter_type" id="filter_type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="None">None</option>
                        <option value="Screen">Screen</option>
                        <option value="Disc">Disc</option>
                    </select>
                    
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="soiltype">Soil Type</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="soiltype" id="soiltype" value={soilType} onChange={(e) => setSoilType(e.target.value)}>
                        <option value="Sandy">Sandy</option>
                        <option value="Clay">Clay</option>
                        <option value="Loam">Loam</option>
                    </select>

                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="pump_used">Pump Used</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="pump_used" id="pump_used" value={pumpUsed} onChange={(e) => setPumpUsed(e.target.value)}>
                        <option value="False">No</option>
                        <option value="True">Yes</option>
                    </select>
                    
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="leakage">Leakage</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="leakage" id="leakage" value={leakage} onChange={(e) => setLeakage(e.target.value)}>
                        <option value="False">No</option>
                        <option value="True">Yes</option>
                    </select>
                    
                    <label htmlFor="weathercondition">Weather Condition</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="weathercondition" id="weathercondition" value={weatherConditions} onChange={(e) => setWeatherConditions(e.target.value)}>
                        <option value="Unknown">Unknown</option>
                        <option value="Sunny">Sunny</option>
                        <option value="Cloudy">Cloudy</option>
                        <option value="Rainy">Rainy</option>
                    </select>
                    
                    <div className="mt-4 flex flex-col gap-1 sm-flex-row">
                        <button className="w-full rounded-md bg-green-500 p-2 text-white sm:w-auto" type="submit">Submit Irrigation Log</button>
                        <Link to="/home"> 
                            <button className="w-full rounded-md bg-gray-500 p-2 text-white">Go Back</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}; 

export default Irrigation