import React, { useState } from "react";
import { BookOpen, Calendar, MapPin, Send, AlertCircle, CheckCircle2, Leaf } from "lucide-react";

const farmact = ({ isLoggedIn, setIsLoggedIn }) => {
  // EXACT VARIABLES FROM YOUR ORIGINAL CODE
  const [activityType, setActivityType] = useState("");
  const [irrigating, setIrrigating] = useState(false);
  const [description, setDescription] = useState("");

  // UI feedback states
  const [status, setStatus] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trainingSessions = [
    { id: 1, date: "May 18", title: "Soil Health & Micro-nutrients", location: "Accra Tech Hub" },
    { id: 2, date: "June 02", title: "Hybrid Seed Performance", location: "Online / Webinar" }
  ];

  // LOGIC FROM YOUR ORIGINAL SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", text: "" });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8000/api/farm/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({
          activity_type: activityType,
          irrigating: irrigating,
          description: description
        })
      });

      if (response.ok) {
        setStatus({ type: "success", text: "Activity submitted successfully!" });
        setActivityType("");
        setIrrigating(false);
        setDescription("");
      } else {
        setStatus({ type: "error", text: "Failed to submit. Please check your connection." });
      }
    } catch (err) {
      setStatus({ type: "error", text: "Server error. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-4 md:p-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 border-b border-slate-100 pb-8">
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="text-emerald-600" size={28} />
          <h1 className="text-4xl font-black tracking-tight text-emerald-950">Agronomy Hub</h1>
        </div>
        <p className="text-slate-500 text-lg">Centralized resources and field activity logs.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Content (Resources + Form) */}
        <div className="lg:col-span-8 space-y-12">
          
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 italic text-emerald-900">
              <BookOpen size={24} /> Product Library
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-emerald-500 transition">
                <div className="w-12 h-12 bg-slate-100 rounded-lg mb-4 flex items-center justify-center font-bold">NPK</div>
                <h3 className="text-xl font-bold">Fertilizer Efficiency</h3>
                <p className="text-slate-500 text-sm mt-2">Optimization charts for nitrogen-based products.</p>
              </div>
              <div className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-emerald-500 transition">
                <div className="w-12 h-12 bg-slate-100 rounded-lg mb-4 flex items-center justify-center font-bold">BIO</div>
                <h3 className="text-xl font-bold">Bio-Stimulants</h3>
                <p className="text-slate-500 text-sm mt-2">Application timing for microbial enhancers.</p>
              </div>
            </div>
          </section>

          {/* Form Section */}
          <section className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">Input Farm Activity</h2>
            <p className="text-slate-500 mb-8">Record your daily activities to sync with the agronomy database.</p>
            
            {status.text && (
              <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <p className="text-sm font-bold">{status.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Activity Type</label>
                <input 
                  className="w-full bg-white border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500" 
                  placeholder="Enter activity Type" 
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 w-fit cursor-pointer">
                <input 
                  type="checkbox" 
                  id="irrigating" 
                  className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                  checked={irrigating} 
                  onChange={(e) => setIrrigating(e.target.checked)} 
                />
                <label htmlFor="irrigating" className="text-sm font-bold text-slate-700 cursor-pointer">
                  Irrigating?
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Activity Description</label>
                <textarea 
                  className="w-full bg-white border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-emerald-500 h-32" 
                  placeholder="Enter description of activity"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 bg-emerald-950 text-white font-bold rounded-2xl hover:bg-emerald-800 transition disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Activity Log"}
              </button>
            </form>
          </section>
        </div>

        {/* Training Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-10 space-y-6">
            <div className="bg-emerald-950 text-white rounded-[32px] p-8 shadow-xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Calendar size={20} className="text-emerald-400" /> Training
              </h2>
              <div className="space-y-8">
                {trainingSessions.map((session) => (
                  <div key={session.id} className="border-l-2 border-emerald-500 pl-4">
                    <p className="text-xs font-bold text-emerald-400 mb-1">{session.date}</p>
                    <h4 className="font-bold text-md leading-tight">{session.title}</h4>
                    <p className="text-xs text-emerald-200/60 mt-1 flex items-center gap-1">
                      <MapPin size={12} /> {session.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default farmact;