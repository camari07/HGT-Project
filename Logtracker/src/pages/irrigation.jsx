import React from "react";
import { useState } from "react";

function Irrigation ({ isLoggedIn, setIsLoggedIn }) {
    const [fieldName, setFieldName] = useState("");
    const [waterAmount, setWaterAmount] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        
        const response = await fetch("http://localhost:8000/api/irrigation/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify({
                field_name: fieldName,
                water_amount: waterAmount,
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log("Irrigation log submitted successfully:", data);
            setFieldName("");
            setWaterAmount("");
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
                    <button className="block bg-green-500 text-white p-2 rounded-md mt-4 ml-18" type="submit">Submit Irrigation Log</button>
                </form>
            </div>
        </div>
    )
}; 

export default Irrigation