import React, { useState } from "react";
import toast from "react-hot-toast";
import { createRecord } from "./backend";
import {
  FormActions,
  FormPage,
  FormSection,
  InlineError,
  inputClass,
  labelClass,
} from "./FormLayout";

const initialValues = { equipment_name: "", maintenance_type: "", description: "" };

function Maintenance() {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (key) => (event) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await createRecord("maintenance", values);
      setValues(initialValues);
      toast.success("Maintenance request saved");
    } catch (requestError) {
      setError(requestError?.message || "Unable to save the maintenance request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormPage
      eyebrow="Operations"
      title="Equipment maintenance"
      description="Record faults, servicing needs and repairs before they disrupt field work."
    >
      <form onSubmit={handleSubmit}>
        <FormSection title="Request details" description="Describe the equipment and the work it needs.">
          <div>
            <label className={labelClass} htmlFor="equipmentName">Equipment name</label>
            <input className={inputClass} id="equipmentName" value={values.equipment_name} onChange={update("equipment_name")} placeholder="e.g. irrigation pump" required />
          </div>
          <div>
            <label className={labelClass} htmlFor="maintenanceType">Maintenance type</label>
            <select className={inputClass} id="maintenanceType" value={values.maintenance_type} onChange={update("maintenance_type")} required>
              <option value="">Select a type</option>
              <option value="Inspection">Inspection</option>
              <option value="Preventive service">Preventive service</option>
              <option value="Repair">Repair</option>
              <option value="Replacement">Replacement</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="maintenanceDescription">Description</label>
            <textarea className={`${inputClass} min-h-32 resize-y`} id="maintenanceDescription" value={values.description} onChange={update("description")} placeholder="Describe the fault, symptoms or required work" required />
          </div>
        </FormSection>
        <InlineError>{error}</InlineError>
        <FormActions
          isSubmitting={isSubmitting}
          submitLabel="Save request"
          whatsappHref="https://wa.me/233505174412?text=Here%20is%20my%20maintenance%20photo"
        />
      </form>
    </FormPage>
  );
}

export default Maintenance;


/*
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Maintenance() {
    const [equipment_name, setEquipmentName] = useState("");
    const [maintenance_type, setMaintenanceType] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        setIsLoading(true);

        try {
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
        } catch (error) {
            console.error("Error submitting maintenance request.", error);
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <div className="min-h-[100dvh] bg-green-100 px-4 py-6 sm:py-10">
                <div className="mx-auto w-full max-w-lg">

                    <form onSubmit={handleSubmit} className="w-full">
                        <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="equipment_name">Equipment Name:</label>
                        <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" id="equipment_name" value={equipment_name} onChange={(e) => setEquipmentName(e.target.value)} required />

                        <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="maintenance_type">Maintenance Type:</label>
                        <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" id="maintenance_type" value={maintenance_type} onChange={(e) => setMaintenanceType(e.target.value)} required />

                        <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="description">Description:</label>
                        <textarea className="block w-full p-2 border border-gray-300 rounded-md" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                        
                        <button disabled={isLoading} className="block bg-green-500 text-white p-2 rounded-md mt-4" type="submit">
                            {isLoading ? "Submitting" : "Submit Request"}
                        </button>

                        <a href="https://wa.me/2330505174412?text=Here%20is%20my%20farm%20activity%20photo"
                                target="_blank"rel="noopener noreferrer">
                                <button className="block bg-green-500 text-white p-2 rounded-md mt-4" >Submit Photo via WhatsApp</button>
                        </a>


                        <Link to="/home"> 
                                <button className="block bg-gray-500 text-white p-2 rounded-md mt-4 ml-18">Go Back</button>
                        </Link>
                    </form>
                </div>
        </div>

                        

    );
}

export default Maintenance;

*/

