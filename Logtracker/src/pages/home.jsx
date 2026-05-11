import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Droplets, Wrench, UserPlus, LogIn } from "lucide-react";

const Home = () => {
  // Navigation cards merged with descriptions and consistent routing
  const navigationCards = [
    {
      title: "Agronomy Hub",
      desc: "Record farm activities, access product libraries, and view field diagnostic tools.",
      link: "/farm", // Updated to match your first snippet's farm link
      icon: <Leaf className="text-emerald-600" />,
      color: "bg-emerald-50",
    },
    {
      title: "Irrigation Solutions",
      desc: "Record irrigation activity, browse materials, and access system support.",
      link: "/irrigation", // Matches both snippets
      icon: <Droplets className="text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      title: "Maintenance & Repairs",
      desc: "Schedule technician visits and manage your Greenhouse or Irrigation installations.",
      link: "/maintenance",
      icon: <Wrench className="text-slate-600" />,
      color: "bg-slate-100",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-xl md:text-2xl font-black text-emerald-800 flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
            HG
          </div>
          <span className="tracking-tight">Holland Greentech <span className="text-emerald-600">Ghana</span></span>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-emerald-700 transition">
            Login
          </Link>
          <Link to="/signup" className="px-5 py-2.5 bg-emerald-700 text-white text-sm font-bold rounded-xl hover:bg-emerald-800 transition shadow-md">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-16 md:py-24 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-emerald-950 leading-tight mb-6">
              Grow Smarter with <br />
              <span className="text-emerald-600 italic">Holland Greentech.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
              We provide Dutch knowledge and technology to Ghanaian farmers. 
              Manage your irrigation, greenhouse systems, and agronomy data in one unified portal.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/irrigation">
                <button className="px-8 py-4 bg-emerald-700 text-white font-bold rounded-2xl hover:bg-emerald-800 transition shadow-xl flex items-center gap-2 group">
                  Access Portals <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition">
                Our Impact
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50 rounded-l-[200px] -z-10 hidden lg:block opacity-60"></div>
      </header>

      {/* Main Navigation Grid */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {navigationCards.map((card, idx) => (
            <Link 
              key={idx} 
              to={card.link}
              className="group p-8 rounded-[40px] border border-slate-100 bg-white hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-500 flex flex-col h-full"
            >
              <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {React.cloneElement(card.icon, { size: 32 })}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{card.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                {card.desc}
              </p>
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm uppercase tracking-wider">
                Explore <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Account Section */}
      <section className="max-w-7xl mx-auto px-8 py-16 mb-12">
        <div className="bg-emerald-950 rounded-[48px] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Farmer & Partner Dashboard</h2>
            <p className="text-emerald-200/80 mb-12 max-w-xl mx-auto text-lg">
              Sign in to manage your Dutch-integrated installations or register for a new account.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/login" className="flex items-center justify-center gap-2 bg-white text-emerald-950 px-10 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition shadow-lg">
                <LogIn size={20} /> Login
              </Link>
              <Link to="/signup" className="flex items-center justify-center gap-2 bg-emerald-800 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition border border-emerald-700/50 shadow-lg">
                <UserPlus size={20} /> Register
              </Link>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500 rounded-full blur-[140px] opacity-20"></div>
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-700 rounded-full blur-[140px] opacity-10"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12 text-center">
        <p className="text-slate-400 text-sm font-medium">
          © 2026 Holland Greentech Ghana. Technical Excellence in Agriculture.
        </p>
      </footer>
    </div>
  );
};

export default Home;