import React, { useState } from "react";
import { Droplets, Settings, ShieldCheck, ClipboardList, Send, AlertCircle } from "lucide-react";

const Irrigation = () => {
  const [activeTab, setActiveTab] = useState("sales");
  
  // State for the Irrigation Log (from Snippet 1)
  const [fieldName, setFieldName] = useState("");
  const [waterAmount, setWaterAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const materials = [
    { id: 1, name: "HDPE Poly Pipes", spec: "32mm - 110mm", price: "Per Meter", stock: "In Stock" },
    { id: 2, name: "Drip Emitters", spec: "Pressure Compensating", price: "Pack of 100", stock: "In Stock" },
    { id: 3, name: "Solar Water Pump", spec: "5HP / Submersible", price: "Unit", stock: "Limited" },
    { id: 4, name: "Disc Filters", spec: "2-inch / 120 Mesh", price: "Unit", stock: "In Stock" },
  ];

  // Integrated Backend Submit Function
  const handleLogSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    const token = localStorage.getItem("token");
    
    try {
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
        setMessage({ type: "success", text: "Irrigation data logged successfully!" });
        setFieldName("");
        setWaterAmount("");
      } else {
        setMessage({ type: "error", text: data.detail || "Failed to submit log." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error. Check if backend is running." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Header */}
      <header className="bg-sky-900 py-12 px-6 text-white shadow-inner">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <Droplets className="text-sky-400" size={32} />
                <h1 className="text-4xl font-black">Irrigation Solutions</h1>
            </div>
            <p className="text-sky-200">Equipment sales, field logging, and technical support.</p>
          </div>
          <div className="bg-sky-800/50 p-4 rounded-2xl border border-sky-700">
            <p className="text-xs font-bold uppercase text-sky-300 mb-1">Status</p>
            <p className="text-sm font-medium flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" /> Authorized Access
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-10 px-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-slate-200 p-1 rounded-xl mb-10 max-w-md">
          <button 
            onClick={() => setActiveTab("sales")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${activeTab === 'sales' ? 'bg-white shadow-sm text-sky-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Material Sales
          </button>
          <button 
            onClick={() => setActiveTab("support")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${activeTab === 'support' ? 'bg-white shadow-sm text-sky-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Data Logs & Service
          </button>
        </div>

        {activeTab === "sales" ? (
          /* SALES VIEW */
          <section className="animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold">Materials for Sale</h2>
              <button className="text-sm font-bold text-sky-600 hover:underline">Download Catalog (PDF)</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {materials.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 p-5 rounded-2xl hover:border-sky-500 transition shadow-sm group">
                  <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <Settings size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800">{item.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{item.spec}</p>
                  <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-sm font-bold text-sky-700">{item.price}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-1 bg-slate-100 rounded text-slate-500">{item.stock}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* SERVICE & LOGS VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in slide-in-from-bottom-4 duration-500">
            
            {/* Left: Info Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-lg mb-4 text-sky-900 flex items-center gap-2">
                    <ClipboardList size={20} /> Field Assistance
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="text-sky-500 font-bold">01.</span>
                    <p className="text-sm text-slate-600 font-medium">Log water consumption daily for accurate yield prediction.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sky-500 font-bold">02.</span>
                    <p className="text-sm text-slate-600 font-medium">24-hour response time for pump failures.</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: The Integrated Log Form (Functionality from Snippet 1) */}
            <div className="lg:col-span-2">
              <form onSubmit={handleLogSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold mb-2">Daily Irrigation Log</h3>
                <p className="text-sm text-slate-500 mb-8">Submit water usage data directly to your farm dashboard.</p>
                
                {message.text && (
                  <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    <AlertCircle size={18} />
                    <span className="text-sm font-medium">{message.text}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Field Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-sky-500 outline-none transition" 
                      placeholder="e.g. North Sector B" 
                      value={fieldName}
                      onChange={(e) => setFieldName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Water Amount (Liters)</label>
                    <input 
                      type="number" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-sky-500 outline-none transition" 
                      placeholder="0.00" 
                      value={waterAmount}
                      onChange={(e) => setWaterAmount(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center justify-center gap-2 bg-sky-700 text-white font-bold py-4 px-8 rounded-xl hover:bg-sky-800 transition shadow-lg w-full md:w-auto ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Send size={18} />
                  {isSubmitting ? "Logging Data..." : "Submit Irrigation Log"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Irrigation;