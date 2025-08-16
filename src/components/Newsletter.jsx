import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Thanks for subscribing, ${email}!`);
      setEmail("");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-blue-800 inline-block relative after:content-[''] after:block after:h-1 after:w-16 after:bg-blue-500 after:mx-auto after:mt-2">
          Stay Updated
        </h2>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Subscribe to our newsletter and never miss our latest courses and
        promotions.
      </p>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Subscribe
        </button>
      </form>

      {/* Small note */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        We care about your data. Read our{" "}
        <a href="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default Newsletter;
