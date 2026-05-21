import React, { useState } from 'react';
import { Phone, MapPin, Globe, Mail, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* Hero Banner Section */}
      <div className="relative bg-gradient-to-r from-green-800 to-emerald-950 py-20 px-6 text-center text-white overflow-hidden">
        {/* Subtle wood-grain-like overlay texture effect */}
        <div className="absolute inset-0 opacity-10 bg-repeat bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-emerald-300 font-semibold tracking-wider uppercase text-sm">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight">
            Holland <span className="text-emerald-400">Greentech</span> Ghana
          </h1>
          <p className="mt-4 text-emerald-100 max-w-xl mx-auto text-base md:text-lg">
            Developing the horticulture sector with sustainable, innovative, and smart farming solutions.
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information Card */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl shadow-gray-200/80 overflow-hidden border border-gray-100 flex flex-col justify-between">
            <div className="p-8">
              {/* Wooden-textured accent header block inspired by the reception wall */}
              <div className="bg-amber-900/10 border-l-4 border-emerald-600 p-4 rounded-r-lg mb-8">
                <h2 className="text-xl font-bold text-amber-950">Contact Information</h2>
                <p className="text-xs text-amber-900/80 mt-1">Visit our front desk or reach out online.</p>
              </div>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Phone</h3>
                    <p className="text-lg font-medium text-gray-900 mt-0.5 hover:text-emerald-600 transition-colors">
                      <a href="tel:+233547330244">+233 54 733 0244</a>
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Address</h3>
                    <p className="text-gray-900 font-medium mt-0.5 leading-relaxed">
                      Park St, Accra, Ghana
                    </p>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Website</h3>
                    <p className="text-gray-900 font-medium mt-0.5 hover:text-emerald-600 transition-colors">
                      <a href="http://www.hollandgreentechghana.com/" target="_blank" rel="noopener noreferrer">
                        hollandgreentechghana.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
                  <div className="p-3 bg-amber-50 text-amber-800 rounded-xl">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Office Hours</h3>
                    <p className="text-gray-900 font-medium mt-0.5">Monday - Friday</p>
                    <p className="text-sm text-gray-500">8:00 AM - 5:00 PM (GMT)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand footer graphic shape inside card */}
            <div className="bg-gradient-to-br from-emerald-800 to-green-900 p-6 text-white text-sm relative">
              <div className="font-semibold mb-1">Holland Greentech Network</div>
              <div className="text-emerald-200 text-xs">Connecting African farmers with top-tier Dutch agricultural expertise.</div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl shadow-gray-200/80 p-8 md:p-10 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Send Us a Message</h2>
            <p className="text-gray-500 mt-2 mb-8">
              Have questions about our products, turnkey greenhouse setups, or irrigation systems? Leave a message below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-gray-900"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-gray-900"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-gray-900"
                  placeholder="Inquiry about irrigation systems..."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-gray-900 resize-none"
                  placeholder="Tell us about your farm or project details..."
                ></textarea>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/20 transform active:scale-95 transition-all duration-150 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Embedded Map Visual/Placeholder Section */}
        <div className="mt-12 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/80 border border-gray-100 overflow-hidden">
          <div className="bg-gray-100 rounded-xl h-80 flex flex-col items-center justify-center text-center px-4 relative">
            {/* Mocking a map layout overlay style */}
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            <div className="relative z-10">
              <div className="p-4 bg-white rounded-full shadow-md inline-block text-emerald-600 animate-bounce mb-3">
                <MapPin className="w-8 h-8 fill-emerald-100" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Find Us in Accra</h4>
              <p className="text-sm text-gray-500 max-w-xs mt-1">Park St, Accra, Ghana</p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer" 
                className="mt-4 inline-block text-xs font-semibold bg-white text-gray-700 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm transition-all"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;