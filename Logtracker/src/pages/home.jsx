import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Droplets, Wrench } from "lucide-react";

const Home = () => {
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_URL}/profile/`, {
      headers: {
        "Authorization": `Token ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => setUsername(data.username))
    .catch(err => console.error("Failed to fetch profile:", err));
  }, []);

  const navigationCards = [
    {
      title: "Agronomy Hub",
      desc: "Record farm activities, access product libraries, and view field diagnostic tools.",
      link: "/farm",
      icon: <Leaf className="text-emerald-600" />,
      color: "bg-emerald-50",
    },
    {
      title: "Irrigation Solutions",
      desc: "Record irrigation activity, browse materials, and access system support.",
      link: "/irrigation",
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
    <div className="mt-20 min-h-screen bg-white px-6 md:px-20 py-12">

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-emerald-950 leading-tight mb-4">
          Welcome{username ? `, ${username}` : ""}! <br />
          <span className="text-emerald-600">Holland Greentech Ghana</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-xl">
          Manage your irrigation, greenhouse systems, and agronomy data all in one place.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {navigationCards.map((card, idx) => (
          <Link
            key={idx}
            to={card.link}
            className="group p-8 rounded-3xl border border-slate-100 bg-white hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-500 flex flex-col h-full"
          >
            <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
              {React.cloneElement(card.icon, { size: 32 })}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
              {card.desc}
            </p>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm uppercase tracking-wider">
              Explore <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;