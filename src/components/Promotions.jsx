import React from "react";

const Promotions = () => {
  return (
    <div className="px-10 relative bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-indigo-700 dark:to-blue-800 text-white rounded-xl overflow-hidden">
      <div className=" mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="mb-6 md:mb-0 md:w-2/3">
          <h2 className="text-3xl font-bold mb-2">
            Back to School Special — 40% Off All Courses!
          </h2>
          <p className="text-lg opacity-90">
            Enroll now and gain unlimited access to our premium learning
            content. Offer valid until August 31st.
          </p>
        </div>

        {/* CTA Button */}
        <div className="md:w-auto">
          <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition-colors">
            Browse Courses
          </button>
        </div>
      </div>

      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 800 800"
        >
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M0 400h800" />
            <path d="M0 200h800" />
            <path d="M0 600h800" />
            <path d="M400 0v800" />
            <path d="M200 0v800" />
            <path d="M600 0v800" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Promotions;
