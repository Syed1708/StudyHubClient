import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      <p className="mb-4">
        Welcome to StudyHub! These Terms and Conditions outline the rules and regulations for using our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing or using StudyHub, you agree to comply with these terms. If you disagree, please do not use our services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. User Accounts</h2>
      <p className="mb-4">
        You are responsible for maintaining the confidentiality of your account and password. Any activity under your account is your responsibility.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Use of Service</h2>
      <ul className="list-disc list-inside mb-4">
        <li>You may use StudyHub for personal educational purposes only.</li>
        <li>You must not misuse the platform, post offensive content, or infringe on intellectual property rights.</li>
        <li>We reserve the right to suspend or terminate accounts that violate these rules.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
      <p className="mb-4">
        StudyHub is provided "as-is." We are not responsible for any damages arising from your use of the platform.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Intellectual Property</h2>
      <p className="mb-4">
        All content, logos, and trademarks on StudyHub are the property of StudyHub or its partners and are protected by intellectual property laws.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to Terms</h2>
      <p className="mb-4">
        We may modify these Terms and Conditions at any time. Your continued use of StudyHub after updates implies acceptance of the new terms.
      </p>

      <p className="mt-8 text-gray-600">Last updated: August 16, 2025</p>
    </div>
  );
};

export default TermsAndConditions;
