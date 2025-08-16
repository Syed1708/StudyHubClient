import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At StudyHub, your privacy is very important to us. This Privacy Policy explains what information we collect, how we use it, and your rights.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Personal information such as name, email, and profile photo.</li>
        <li>Usage data such as pages visited, time spent, and interactions on the site.</li>
        <li>Cookies to enhance your browsing experience.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To provide, maintain, and improve our services.</li>
        <li>To personalize your experience.</li>
        <li>To send updates, notifications, or promotional content.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell your personal information. We may share information with trusted third parties only for service improvements or legal compliance.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Security</h2>
      <p className="mb-4">
        We implement industry-standard security measures to protect your information. However, no online platform is completely secure.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You can request to access, update, or delete your personal information at any time by contacting us.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated date.
      </p>

      <p className="mt-8 text-gray-600">Last updated: August 16, 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
