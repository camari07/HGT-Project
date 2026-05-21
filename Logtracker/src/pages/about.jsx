import React from "react";

function About() {
    return (
        <div className="mt-20 px-6 md:px-20 py-10 bg-green-50 min-h-screen">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold text-green-700 mb-2">About Holland Greentech Ghana</h1>
                <p className="text-gray-500 text-sm mb-8">Empowering vegetable growers across Africa with knowledge, inputs, and support.</p>

                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-green-600 mb-3">Who We Are</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Holland Greentech Ghana is the Ghanaian arm of Holland Greentech, a leading horticultural service company dedicated to supporting vegetable growers with high-quality inputs and expert agronomic advice. Based in East Legon, Accra, we proudly serve farmers across Ghana with world-class solutions tailored to local growing conditions.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-green-600 mb-3">What We Do</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        We go beyond selling inputs — our model combines products and services to give farmers a complete support system. Our offerings include:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            "Premium seeds and planting materials",
                            "Irrigation and drip kit solutions",
                            "Greenhouse design and installation",
                            "Crop protection products",
                            "Soil testing and fertilization advice",
                            "Pest and disease management",
                            "Substrates and growing media",
                            "Hands-on farmer training and support",
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                                <span className="text-green-500 font-bold mt-1">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-green-600 mb-3">Our Presence in Ghana</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Holland Greentech Ghana has been actively involved in horticulture projects and demonstration sites across the country. We have partnered with institutions such as Kwadaso Agricultural College to support farmer training and advance horticulture education. Our East Legon office serves as a hub for farmers, agronomists, and partners seeking practical solutions for modern farming.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-green-600 mb-3">Our Broader Mission</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Across Africa, Holland Greentech serves small commercial farmers with an integrated package of products, knowledge, and market connections. By partnering with leading European suppliers for seeds, irrigation systems, substrates, and crop-care solutions, we bring the best of global horticultural expertise directly to African farms — with a special focus on vegetable production and precision farming.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default About;