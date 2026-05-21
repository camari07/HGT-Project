import React from "react";
import { useState } from "react";

function Irrigation ({ isLoggedIn, setIsLoggedIn }) {
    const [fieldName, setFieldName] = useState("");
    const [waterAmount, setWaterAmount] = useState("");
    const [waterSource, setWaterSource] = useState("Unknown");
    const [pumpUsed, setPumpUsed] = useState(false);
    const [fertilizerUsed, setFertilizerUsed] = useState("None");
    const [filterType, setFilterType] = useState("None");
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
                leakage: leakage
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log("Irrigation log submitted successfully:", data);
            setFieldName("");
            setWaterAmount("");
            setWaterSource("Unknown");
            setPumpUsed(false);
            setFilterType("None");
            setLeakage(false);
        } else {
            console.error("Failed to submit irrigation log:", data);
        }
        
    }

    return(
        <div className="grid place-items-center h-screen bg-green-100">
            
       
            <div className="grid justify-items-center mt-20 w-full h-screen bg-green-100">
                <form action="" onSubmit={handleSubmit}>
                    <h2>INPUT YOUR IRRIGATION DATA HERE</h2>
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="fieldname">Field Name</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" id="fieldname" placeholder="Field name" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="wateramount">Water Amount (liters)</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="number" id="wateramount" placeholder="Water amount in liters" value={waterAmount} onChange={(e) => setWaterAmount(e.target.value)} />
                    
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="water_source">Water Source</label>
                    <select name="water_source" id="water_source" value={waterSource} onChange={(e) => setWaterSource(e.target.value)}>
                        <option value="Unknown">Unknown</option>
                        <option value="Well">Well</option>
                        <option value="Borehole">Borehole</option>
                        <option value="Reservoir">Reservoir</option>
                        <option value="River">River</option>
                    </select>
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="filter_type">Filter Type</label>
                    <select name="filter_type" id="filter_type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="None">None</option>
                        <option value="Screen">Screen</option>
                        <option value="Disc">Disc</option>
                    </select>
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="pump_used">Pump Used</label>
                    <select name="pump_used" id="pump_used" value={pumpUsed} onChange={(e) => setPumpUsed(e.target.value)}>
                        <option value="False">No</option>
                        <option value="True">Yes</option>
                    </select>
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="leakage">Leakage</label>
                    <select name="leakage" id="leakage" value={leakage} onChange={(e) => setLeakage(e.target.value)}>
                        <option value="False">No</option>
                        <option value="True">Yes</option>
                    </select>

                    <button className="block bg-green-500 text-white p-2 rounded-md mt-4 ml-18" type="submit">Submit Irrigation Log</button>
                </form>
            </div>
        </div>
    )
}; 

export default Irrigation