import React from 'react';

const About = () => {
  return (
    <div className="relative overflow-hidden bg-white">
     
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-50 z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-6 text-center">
          About Restaurant Rating System
        </h1>

        <p className="text-gray-700 text-lg mb-4 text-center max-w-3xl mx-auto">
          Welcome! This platform helps food lovers find amazing restaurants,
          share honest reviews, and choose their next dining spot with trust.
        </p>

        <p className="text-gray-700 text-lg mb-4 text-center max-w-3xl mx-auto">
          Our mission is simple: connect you with great food through genuine,
          verified ratings. Only logged-in users can rate — so all reviews
          stay real and helpful.
        </p>

        <p className="text-gray-700 text-lg mb-10 text-center max-w-3xl mx-auto">
          Whether you’re a food explorer, a chef, or someone who just loves
          trying new cuisines, we’re here to make your experience better.
          Thanks for being part of our community!
        </p>

        {/* CTA Button with hover effect */}
        <div className="flex justify-center">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 hover:scale-105 transition transform duration-300"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
