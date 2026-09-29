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

const initialValues = {
  location: "",
  farm_size: "",
  crop: "",
  plant_growth_stage: "",
  activity_type: "",
  condition_of_irrigation_system: "",
  irrigating: false,
  description: "",
  fertilizer_used: "",
  crop_condition: "",
  pest_observations: "None",
  pest_control_measures: "None",
};

function FarmActivity() {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (key) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await createRecord("farmActivity", {
        ...values,
        farm_size: values.farm_size ? Number(values.farm_size) : null,
      });
      setValues(initialValues);
      toast.success("Farm activity saved");
    } catch (requestError) {
      setError(requestError?.message || "Unable to save the farm activity.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormPage
      eyebrow="Agronomy"
      title="Log a farm activity"
      description="Capture field work, crop condition and observations in one structured record."
    >
      <form onSubmit={handleSubmit}>
        <FormSection title="Field details" description="Identify the field and the crop being managed.">
          <div>
            <label className={labelClass} htmlFor="activityLocation">Location</label>
            <input className={inputClass} id="activityLocation" value={values.location} onChange={update("location")} placeholder="e.g. Ada, Field A" required />
          </div>
          <div>
            <label className={labelClass} htmlFor="activityFarmSize">Farm size (acres)</label>
            <input className={inputClass} id="activityFarmSize" type="number" min="0" step="0.01" inputMode="decimal" value={values.farm_size} onChange={update("farm_size")} placeholder="e.g. 2" required />
          </div>
          <div>
            <label className={labelClass} htmlFor="activityCrop">Crop</label>
            <input className={inputClass} id="activityCrop" value={values.crop} onChange={update("crop")} placeholder="e.g. Cayenne pepper" required />
          </div>
          <div>
            <label className={labelClass} htmlFor="growthStage">Plant growth stage</label>
            <select className={inputClass} id="growthStage" value={values.plant_growth_stage} onChange={update("plant_growth_stage")} required>
              <option value="">Select a stage</option>
              <option value="Seedling">Seedling</option>
              <option value="Vegetative">Vegetative</option>
              <option value="Flowering">Flowering</option>
              <option value="Fruiting">Fruiting</option>
              <option value="Harvesting">Harvesting</option>
            </select>
          </div>
        </FormSection>

        <div className="my-7 border-t border-slate-200" />

        <FormSection title="Work completed" description="Record the activity and any related irrigation or fertilizer use.">
          <div>
            <label className={labelClass} htmlFor="activityType">Activity type</label>
            <select className={inputClass} id="activityType" value={values.activity_type} onChange={update("activity_type")} required>
              <option value="">Select an activity</option>
              <option value="Land preparation">Land preparation</option>
              <option value="Planting">Planting</option>
              <option value="Weeding">Weeding</option>
              <option value="Fertilizer application">Fertilizer application</option>
              <option value="Pest control">Pest control</option>
              <option value="Irrigation">Irrigation</option>
              <option value="Harvesting">Harvesting</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="irrigationCondition">Irrigation-system condition</label>
            <select className={inputClass} id="irrigationCondition" value={values.condition_of_irrigation_system} onChange={update("condition_of_irrigation_system")}>
              <option value="">Not inspected</option>
              <option value="Good">Good</option>
              <option value="Leakages">Leakages</option>
              <option value="Broken">Broken</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="fertilizerUsed">Fertilizer used</label>
            <input className={inputClass} id="fertilizerUsed" value={values.fertilizer_used} onChange={update("fertilizer_used")} placeholder="Enter product and rate, or leave blank" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="activityDescription">Activity description</label>
            <textarea className={`${inputClass} min-h-28 resize-y`} id="activityDescription" value={values.description} onChange={update("description")} placeholder="What was done, where and by whom?" required />
          </div>
          <label className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 sm:col-span-2" htmlFor="irrigating">
            <input className="h-5 w-5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600" type="checkbox" id="irrigating" checked={values.irrigating} onChange={update("irrigating")} />
            Irrigation was carried out during this activity
          </label>
        </FormSection>

        <div className="my-7 border-t border-slate-200" />

        <FormSection title="Crop health" description="Record the condition observed and any response taken.">
          <div>
            <label className={labelClass} htmlFor="cropCondition">Crop condition</label>
            <select className={inputClass} id="cropCondition" value={values.crop_condition} onChange={update("crop_condition")} required>
              <option value="">Select condition</option>
              <option value="Healthy">Healthy</option>
              <option value="Slightly yellowing">Slightly yellowing</option>
              <option value="Wilting">Wilting</option>
              <option value="Pest presence">Pest presence</option>
              <option value="Spots on leaves">Spots on leaves</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="pestObservation">Pest or disease observation</label>
            <select className={inputClass} id="pestObservation" value={values.pest_observations} onChange={update("pest_observations")}>
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
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="pestControl">Pest-control measure</label>
            <select className={inputClass} id="pestControl" value={values.pest_control_measures} onChange={update("pest_control_measures")}>
              <option value="None">None</option>
              <option value="Chemical pesticides">Chemical pesticides</option>
              <option value="Biological control">Biological control</option>
              <option value="Cultural practices">Cultural practices</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </FormSection>

        <InlineError>{error}</InlineError>
        <FormActions
          isSubmitting={isSubmitting}
          submitLabel="Save farm activity"
          whatsappHref="https://wa.me/233505174412?text=Here%20is%20my%20farm%20activity%20photo"
        />
      </form>
    </FormPage>
  );
}

export default FarmActivity;





/*
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
    const [irrigating, setIrrigating] = useState("False");
    const [description, setDescription] = useState("");
    const [fertilizerUsed, setFertilizerUsed] = useState("");
    const [crop_condition, setCropCondition] = useState("");
    const [location, setLocation] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const token = localStorage.getItem("token");

        try{const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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
                setIrrigating("False");
                setDescription("");
                setFertilizerUsed("");
                setCropCondition("");
                setFarmSize("");
                setCrop("");
                setLocation("");
                setPlantGrowthStage("");
                setConditionOfIrrigationSystem("");
                setPestObservations("");
                setPestControlMeasures("");

            } else {
                console.log("failed to submit")
                toast.error("Failed to submit farm activity log. Please try again.");
            } 
        } catch (error) {
                console.error("An error occurred while submitting the farm activity log:", error);
                toast.error("An error occurred. Please try again.");
            } finally {
                setIsLoading(false);
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
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="conditionofirrigation" id="" value={conditionOfIrrigationSystem} onChange={(e) => setConditionOfIrrigationSystem(e.target.value)}>
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
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="pestobserved" id="" value={pestObservations} onChange={(e) => setPestObservations(e.target.value)}>
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
                        <button disabled={isLoading} className="cursor-pointer w-full rounded-md bg-green-500 p-2 text-white sm:w-auto" type="submit">
                            {isLoading ? "Submitting" : "Submit"}
                        </button>
                        
                        <Link to="/home"> 
                            <button className="w-full rounded-md bg-gray-500 p-2 text-white">Go Back</button>
                        </Link> 
                        <a href="https://wa.me/2330505174412?text=Here%20is%20my%20farm%20activity%20photo"
                                target="_blank"rel="noopener noreferrer">
                                <button className="cursor-pointer w-full rounded-md bg-green-500 p-2 text-white sm:w-auto" >Submit Photo via WhatsApp</button>
                        </a>
                    </div>               
                </form>
            </div>
        </div>
    )

};

export default FarmActivity

*/