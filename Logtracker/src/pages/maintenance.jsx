import React from "react";
import { useState } from "react";

function Maintenance() {
    const [equipment_name, setEquipmentName] = useState("");
    const [maintenance_type, setMaintenanceType] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

        const response = await fetch(`${BASE_URL}/api/maintenance/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify({
                equipment_name,
                maintenance_type,
                description
            })
        });

        if (response.ok) {
            console.log("Maintenance request submitted successfully");
            setEquipmentName("");
            setMaintenanceType("");
            setDescription("");
        } else {
            console.error("Error submitting maintenance request.");
        }
    };

    return (
        <div className="maintenance-container">
           <div className="mt-20">
            <form onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="equipment_name">Equipment Name:</label>
                <input type="text" id="equipment_name" value={equipment_name} onChange={(e) => setEquipmentName(e.target.value)} required />

                <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="maintenance_type">Maintenance Type:</label>
                <input type="text" id="maintenance_type" value={maintenance_type} onChange={(e) => setMaintenanceType(e.target.value)} required />

                <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="description">Description:</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <button type="submit">Submit Request</button>
                
                <Link to="/home"> 
                        <button className="block bg-gray-500 text-white p-2 rounded-md mt-4 ml-18">Go Back</button>
                </Link>
            </form>
        </div>

        </div>
    );
}

export default Maintenance;