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
  field_name: "",
  location: "",
  farm_size: "",
  crop_type: "",
  plant_growth_stage: "",
  irrigation_method: "",
  irrigation_duration: "",
  water_amount: "",
  water_source: "Unknown",
  pump_used: false,
  fertilizer_used: "None",
  filter_type: "None",
  soil_type: "",
  weather_conditions: "",
  leakage: false,
};

function Irrigation() {
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
      await createRecord("irrigation", {
        ...values,
        farm_size: values.farm_size ? Number(values.farm_size) : null,
        irrigation_duration: values.irrigation_duration ? Number(values.irrigation_duration) : null,
        water_amount: values.water_amount ? Number(values.water_amount) : null,
      });
      setValues(initialValues);
      toast.success("Irrigation log saved");
    } catch (requestError) {
      setError(requestError?.message || "Unable to save the irrigation log.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormPage
      eyebrow="Water management"
      title="Log irrigation"
      description="Record when, how and how much water was applied to each field."
    >
      <form onSubmit={handleSubmit}>
        <FormSection title="Field details" description="Identify the field, crop and current conditions.">
          <div>
            <label className={labelClass} htmlFor="fieldName">Field name</label>
            <input className={inputClass} id="fieldName" value={values.field_name} onChange={update("field_name")} placeholder="e.g. Pepper Block A" required />
          </div>
          <div>
            <label className={labelClass} htmlFor="irrigationLocation">Location</label>
            <input className={inputClass} id="irrigationLocation" value={values.location} onChange={update("location")} placeholder="e.g. Ada" required />
          </div>
          <div>
            <label className={labelClass} htmlFor="irrigationFarmSize">Farm size (acres)</label>
            <input className={inputClass} id="irrigationFarmSize" type="number" min="0" step="0.01" inputMode="decimal" value={values.farm_size} onChange={update("farm_size")} required />
          </div>
          <div>
            <label className={labelClass} htmlFor="cropType">Crop type</label>
            <input className={inputClass} id="cropType" value={values.crop_type} onChange={update("crop_type")} placeholder="e.g. Cayenne pepper" required />
          </div>
          <div>
            <label className={labelClass} htmlFor="irrigationGrowthStage">Plant growth stage</label>
            <select className={inputClass} id="irrigationGrowthStage" value={values.plant_growth_stage} onChange={update("plant_growth_stage")} required>
              <option value="">Select a stage</option>
              <option value="Seedling">Seedling</option>
              <option value="Vegetative">Vegetative</option>
              <option value="Flowering">Flowering</option>
              <option value="Fruiting">Fruiting</option>
              <option value="Harvesting">Harvesting</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="soilType">Soil type</label>
            <select className={inputClass} id="soilType" value={values.soil_type} onChange={update("soil_type")} required>
              <option value="">Select soil type</option>
              <option value="Sandy">Sandy</option>
              <option value="Clay">Clay</option>
              <option value="Loam">Loam</option>
              <option value="Sandy loam">Sandy loam</option>
              <option value="Clay loam">Clay loam</option>
            </select>
          </div>
        </FormSection>

        <div className="my-7 border-t border-slate-200" />

        <FormSection title="Irrigation event" description="Capture the system setup and application volume.">
          <div>
            <label className={labelClass} htmlFor="irrigationMethod">Irrigation method</label>
            <select className={inputClass} id="irrigationMethod" value={values.irrigation_method} onChange={update("irrigation_method")} required>
              <option value="">Select a method</option>
              <option value="Drip">Drip</option>
              <option value="Sprinkler">Sprinkler</option>
              <option value="Flood">Flood</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="waterSource">Water source</label>
            <select className={inputClass} id="waterSource" value={values.water_source} onChange={update("water_source")}>
              <option value="Unknown">Unknown</option>
              <option value="Well">Well</option>
              <option value="Borehole">Borehole</option>
              <option value="Reservoir">Reservoir</option>
              <option value="River">River</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="irrigationDuration">Duration (hours)</label>
            <input className={inputClass} id="irrigationDuration" type="number" min="0" step="0.01" inputMode="decimal" value={values.irrigation_duration} onChange={update("irrigation_duration")} required />
          </div>
          <div>
            <label className={labelClass} htmlFor="waterAmount">Water amount (litres)</label>
            <input className={inputClass} id="waterAmount" type="number" min="0" step="0.01" inputMode="decimal" value={values.water_amount} onChange={update("water_amount")} required />
          </div>
          <div>
            <label className={labelClass} htmlFor="filterType">Filter type</label>
            <select className={inputClass} id="filterType" value={values.filter_type} onChange={update("filter_type")}>
              <option value="None">None</option>
              <option value="Screen">Screen</option>
              <option value="Disc">Disc</option>
              <option value="Sand media">Sand media</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="fertilizerIrrigation">Fertilizer used</label>
            <input className={inputClass} id="fertilizerIrrigation" value={values.fertilizer_used} onChange={update("fertilizer_used")} placeholder="Product and rate, or None" />
          </div>
          <div>
            <label className={labelClass} htmlFor="weatherConditions">Weather condition</label>
            <select className={inputClass} id="weatherConditions" value={values.weather_conditions} onChange={update("weather_conditions")} required>
              <option value="">Select condition</option>
              <option value="Sunny">Sunny</option>
              <option value="Cloudy">Cloudy</option>
              <option value="Rainy">Rainy</option>
              <option value="Windy">Windy</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700" htmlFor="pumpUsed">
              <input className="h-5 w-5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600" type="checkbox" id="pumpUsed" checked={values.pump_used} onChange={update("pump_used")} />
              Pump used
            </label>
            <label className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700" htmlFor="leakage">
              <input className="h-5 w-5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600" type="checkbox" id="leakage" checked={values.leakage} onChange={update("leakage")} />
              Leakage observed
            </label>
          </div>
        </FormSection>

        <InlineError>{error}</InlineError>
        <FormActions
          isSubmitting={isSubmitting}
          submitLabel="Save irrigation log"
          whatsappHref="https://wa.me/233505174412?text=Here%20is%20my%20irrigation%20activity%20photo"
        />
      </form>
    </FormPage>
  );
}

export default Irrigation;




/*
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Irrigation ({ isLoggedIn, setIsLoggedIn }) {
    const [fieldName, setFieldName] = useState("");
    const [location, setLocation] = useState("");
    const [farmSize, setFarmSize] = useState("");
    const [cropType, setCropType] = useState("");
    const [plantGrowthStage, setPlantGrowthStage] = useState("");
    const [irrigationMethod, setIrrigationMethod] = useState("");
    const [irrigationDuration, setIrrigationDuration] = useState("");
    const [waterAmount, setWaterAmount] = useState("");
    const [waterSource, setWaterSource] = useState("Unknown");
    const [pumpUsed, setPumpUsed] = useState(false);
    const [fertilizerUsed, setFertilizerUsed] = useState("None");
    const [filterType, setFilterType] = useState("None");
    const [soilType, setSoilType] = useState("");
    const [weatherConditions, setWeatherConditions] = useState("");
    const [leakage, setLeakage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
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
                setWaterSource("");
                setPumpUsed(false);
                setFilterType("None");
                setLeakage(false);
                setCropType("");
                setLocation("");
                setFarmSize("");
                setPlantGrowthStage("");
                setIrrigationMethod("");
                setIrrigationDuration("");
                setSoilType("");
                setWeatherConditions("");
            } else {
                console.error("Failed to submit irrigation log:", data);
                toast.error("Failed to submit irrigation log. Please try again.");
            }
        } catch (error) {
            console.error("An error occurred while submitting the irrigation log:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="min-h-[100dvh] bg-green-100 px-4 py-6 sm:py-10">
            
       
            <div className="mx-auto w-full max-w-lg">
                <form action="" onSubmit={handleSubmit} className="w-full">
                    <h2>INPUT YOUR IRRIGATION DATA HERE</h2>
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="fieldname">Field Name</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" id="fieldname" placeholder="Field name" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />

                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="location">Location</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" id="location" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="farmsize">Farm Size (acres)</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="number" id="farmsize" placeholder="Farm size in acres" value={farmSize} onChange={(e) => setFarmSize(e.target.value)} />
                    
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="croptype">Crop Type</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" id="croptype" placeholder="Crop type" value={cropType} onChange={(e) => setCropType(e.target.value)} />
                    
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="plantgrowthstage">Plant Growth Stage</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="plantgrowthstage" id="plantgrowthstage" value={plantGrowthStage} onChange={(e) => setPlantGrowthStage(e.target.value)}>
                        <option value="" disabled>Select an option</option>
                        <option value="Seedling">Seedling</option>
                        <option value="Vegetative">Vegetative</option>
                        <option value="Flowering">Flowering</option>
                        <option value="Fruiting">Fruiting</option>
                    </select>

                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="irrigationmethod">Irrigation Method</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="irrigationmethod" id="irrigationmethod" value={irrigationMethod} onChange={(e) => setIrrigationMethod(e.target.value)}>
                        <option value="" disabled>Select an option</option>
                        <option value="Drip">Drip</option>
                        <option value="Sprinkler">Sprinkler</option>
                        <option value="Flood">Flood</option>
                    </select>

                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="irrigationduration">Irrigation Duration (hours)</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="number" id="irrigationduration" placeholder="Irrigation duration in hours" value={irrigationDuration} onChange={(e) => setIrrigationDuration(e.target.value)} />



                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="wateramount">Water Amount (liters)</label>
                    <input className="block w-full p-2 border border-gray-300 rounded-md" type="number" id="wateramount" placeholder="Water amount in liters" value={waterAmount} onChange={(e) => setWaterAmount(e.target.value)} />
                    
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="water_source">Water Source</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="water_source" id="water_source" value={waterSource} onChange={(e) => setWaterSource(e.target.value)}>
                        <option value="" disabled>Select an option</option>
                        <option value="Unknown">Unknown</option>
                        <option value="Well">Well</option>
                        <option value="Borehole">Borehole</option>
                        <option value="Reservoir">Reservoir</option>
                        <option value="River">River</option>
                    </select>
                   
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="filter_type">Filter Type</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="filter_type" id="filter_type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="" disabled>Select an option</option>
                        <option value="None">None</option>
                        <option value="Screen">Screen</option>
                        <option value="Disc">Disc</option>
                    </select>
                    
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="soiltype">Soil Type</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="soiltype" id="soiltype" value={soilType} onChange={(e) => setSoilType(e.target.value)}>
                        <option value="" disabled>Select an option</option>
                        <option value="Sandy">Sandy</option>
                        <option value="Clay">Clay</option>
                        <option value="Loam">Loam</option>
                    </select>

                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="pump_used">Pump Used</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="pump_used" id="pump_used" value={pumpUsed} onChange={(e) => setPumpUsed(e.target.value)}>
                        <option value="" disabled>Select an option</option>
                        <option value="False">No</option>
                        <option value="True">Yes</option>
                    </select>
                    
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="leakage">Leakage</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="leakage" id="leakage" value={leakage} onChange={(e) => setLeakage(e.target.value)}>
                        <option value="False">No</option>
                        <option value="True">Yes</option>
                    </select>
                    
                    <label className="block text-sm font-medium text-gray-700 text-left py-2" htmlFor="weathercondition">Weather Condition</label>
                    <select className="block w-full rounded-md border border-gray-300 p-2" name="weathercondition" id="weathercondition" value={weatherConditions} onChange={(e) => setWeatherConditions(e.target.value)}>
                        <option value="" disabled>Select an option</option>
                        <option value="Sunny">Sunny</option>
                        <option value="Cloudy">Cloudy</option>
                        <option value="Rainy">Rainy</option>
                    </select>
                    
                    <div className="mt-4 flex flex-col gap-1 sm-flex-row">
                        <button disabled={isLoading} className="w-full rounded-md bg-green-500 p-2 text-white sm:w-auto" type="submit">
                            {isLoading ? "Submitting" : "Submit Irrigation Log"}
                        </button>
                        
                        <Link to="/home"> 
                            <button className="w-full rounded-md bg-gray-500 p-2 text-white">Go Back</button>
                        </Link>
                    </div>
                </form>
                <a href="https://wa.me/2330505174412?text=Here%20is%20my%20irrigation%20activity%20photo"
                                target="_blank"rel="noopener noreferrer">
                                <button className="cursor-pointer w-full rounded-md bg-green-500 p-2 text-white sm:w-auto" >Submit Photo via WhatsApp</button>
                 </a>
            </div>
        </div>
    )
}; 

export default Irrigation

*/