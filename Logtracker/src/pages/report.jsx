import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

function Report() {
   const [title, setTitle] = useState("");
   const [problemType, setProblemType] = useState("");
   const [description, setDescription] = useState("");
   const [contactInfo, setContactInfo] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const token = localStorage.getItem("token");

      try {
         const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

        const response = await fetch(`${BASE_URL}/api/report/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify({
                title: title,
                problem_type: problemType,
                description: description,
                contact: contactInfo
            })
        })
        const data = response.json();

            if (response.ok) { console.log("Report submitted successfully:", data);
                toast.success("Report submitted successfully");
                setTitle("");
                setProblemType("");
                setDescription("");
                setContactInfo("");
            } else {
                console.error("Failed to submit report:", data);
                toast.error("Failed to submit report. Please try again.");
            }   
         } catch (error) {
            console.error("An error occurred while submitting the report:", error);
            toast.error("An error occurred. Please try again.");
         } finally {
            setIsSubmitting(false);
    
         };

        }

      return (
         <div className="min-h-[100dvh] bg-green-100 px-4 py-6 sm:py-10">
            <div className="mx-auto w-full max-w-lg">
               <form onSubmit={handleSubmit} className="w-full">
                  <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="title">Title:</label>
                  <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

                  <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="problemType">Problem Type:</label>
                  <select name="problemtype" id="" value={problemType} onChange={(e) => setProblemType(e.target.value)} required className="block w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Select a problem type</option>
                    <option value="Agronomy">Agronomy</option>
                    <option value="Irrigation">Irrigation</option>
                    <option value="other">Other</option>
                  </select>

                  <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="description">Description:</label>
                  <textarea className="block w-full p-2 border border-gray-300 rounded-md" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

                  <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="contactInfo">Contact Information:</label>
                  <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" id="contactInfo" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} required />

                  <button className="block bg-green-500 text-white p-2 rounded-md mt-4" type="submit">Submit Report</button>
               </form>
               <Link to="/home"> 
                            <button className="w-full rounded-md bg-gray-500 p-2 text-white">Go Back</button>
               </Link>
            </div>
         </div>
      );


   };

export default Report;