import React, { useState } from 'react';
import { Phone, MapPin, Globe, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-gray-800 p-4 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT SIDE: Direct replication of the Office Front Desk Elements */}
          <div className="lg:col-span-5 relative bg-[#5c3a21] text-white p-8 flex flex-col justify-between overflow-hidden">
            
            {/* Simulated Vertical Wood Paneling Backdrop */}
            <div 
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px)',
                backgroundSize: '16px 100%'
              }}
            ></div>

            <div className="relative z-10">
              {/* Green Brand Logo Text matching the wall sign */}
              <div className="mb-12">
                <h1 className="text-3xl font-black tracking-wider text-[#008751] drop-shadow-sm font-sans uppercase leading-none">
                  Holland
                </h1>
                <h1 className="text-3xl font-black tracking-wider text-[#008751] drop-shadow-sm font-sans uppercase leading-none mt-1">
                  Greentech
                </h1>
                <p className="text-xs text-emerald-400 mt-2 font-medium tracking-wide">GHANA OFFICE</p>
              </div>

              {/* Verified Office Details */}
              <div className="space-y-8 my-auto">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white/10 rounded border border-white/10 text-[#008751]">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-gray-400 font-bold">Call Front Desk</span>
                    <a href="tel:+233547330244" className="text-lg font-medium hover:text-emerald-400 transition-colors">
                      +233 54 733 0244
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white/10 rounded border border-white/10 text-[#008751]">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-gray-400 font-bold">Find Us</span>
                    <p className="text-base font-medium">Park St, Accra, Ghana</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white/10 rounded border border-white/10 text-[#008751]">
                    <Globe className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-gray-400 font-bold">Web Portal</span>
                    <a href="http://www.hollandgreentechghana.com/" target="_blank" rel="noopener noreferrer" className="text-base font-medium hover:text-emerald-400 transition-colors">
                      hollandgreentechghana.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Banner tagline from the roll-up banner image text */}
            <div className="relative z-10 mt-12 pt-6 border-t border-white/10 text-xs text-gray-300">
              <span className="text-[#008751] font-bold block mb-1">Developing the horticulture sector</span>
              Providing commercial farmers with input, premium tech, and agronomical services.
            </div>

          </div>

          {/* RIGHT SIDE: Clean White Desk Style Form */}
          <div className="lg:col-span-7 p-8 md:p-12 bg-white flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Digital Front Desk</h2>
              <p className="text-sm text-gray-500 mt-1 mb-8">
                Leave a direct message for the Holland Greentech team below.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded text-gray-900 focus:outline-none focus:border-[#008751] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded text-gray-900 focus:outline-none focus:border-[#008751] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Subject / Inquiry Type
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded text-gray-900 focus:outline-none focus:border-[#008751] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded text-gray-900 focus:outline-none focus:border-[#008751] transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#008751] hover:bg-[#006e41] text-white font-bold uppercase tracking-wider text-xs rounded transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to Desk</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;